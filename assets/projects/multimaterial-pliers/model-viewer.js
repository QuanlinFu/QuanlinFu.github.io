/* Dependency-free STL preview. STL coordinates and body layout are preserved. */
(() => {
  "use strict";
  const canvas = document.getElementById("model");
  const status = document.getElementById("status");
  const buttons = [...document.querySelectorAll("button[data-action]")];
  let gl;
  let ready = false;
  let scheduled = false;
  let program;
  let count = 0;
  let modelPositions;
  let azimuth = 0.3;
  let elevation = 0.78;
  let zoom = 1;
  const pointers = new Map();
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function fail(message) {
    ready = false;
    status.textContent = message + " You can still download the original STL below.";
    status.hidden = false;
    buttons.forEach(button => { button.disabled = true; });
    canvas.setAttribute("aria-label", "3D preview unavailable. Use the Download STL link to open the model in a CAD application.");
  }

  function parseSTL(buffer) {
    const view = new DataView(buffer);
    let positions;
    // Binary STLs can also begin with "solid", so validate their length first.
    const triangles = buffer.byteLength >= 84 ? view.getUint32(80, true) : 0;
    if (triangles > 0 && 84 + triangles * 50 === buffer.byteLength) {
      positions = new Float32Array(triangles * 9);
      for (let t = 0; t < triangles; t++) {
        for (let j = 0; j < 9; j++) positions[t * 9 + j] = view.getFloat32(84 + t * 50 + 12 + j * 4, true);
      }
    } else {
      const text = new TextDecoder().decode(buffer);
      const vertices = [...text.matchAll(/\bvertex\s+([-+\d.eE]+)\s+([-+\d.eE]+)\s+([-+\d.eE]+)/g)];
      if (!vertices.length || vertices.length % 3) throw new Error("Invalid STL geometry");
      positions = Float32Array.from(vertices.flatMap(vertex => vertex.slice(1).map(Number)));
    }
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < positions.length; i++) {
      const value = positions[i];
      if (!Number.isFinite(value)) throw new Error("Invalid STL coordinate");
      min[i % 3] = Math.min(min[i % 3], value);
      max[i % 3] = Math.max(max[i % 3], value);
    }
    const center = min.map((value, i) => (value + max[i]) / 2);
    const scale = 2 / Math.max(...max.map((value, i) => value - min[i]));
    if (!Number.isFinite(scale)) throw new Error("Empty STL geometry");
    // Turn STL Z-up into world Y-up with a proper rotation (no reflection).
    for (let i = 0; i < positions.length; i += 3) {
      const x = (positions[i] - center[0]) * scale;
      const y = (positions[i + 2] - center[2]) * scale;
      const z = -(positions[i + 1] - center[1]) * scale;
      positions.set([x, y, z], i);
    }
    const normals = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 9) {
      const a = positions.slice(i, i + 3);
      const u = positions.slice(i + 3, i + 6).map((value, k) => value - a[k]);
      const v = positions.slice(i + 6, i + 9).map((value, k) => value - a[k]);
      const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const length = Math.hypot(...n) || 1;
      for (let j = 0; j < 3; j++) normals.set(n.map(value => value / length), i + j * 3);
    }
    return { positions, normals };
  }

  function shader(type, source) {
    const result = gl.createShader(type);
    gl.shaderSource(result, source);
    gl.compileShader(result);
    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw new Error("Shader compilation failed");
    return result;
  }

  function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, 2 * far * near / (near - far), 0]);
  }

  function lookAt(eye) {
    const normalize = vector => { const length = Math.hypot(...vector); return vector.map(value => value / length); };
    const z = normalize(eye);
    const x = normalize([z[2], 0, -z[0]]);
    const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
    const dot = vector => vector.reduce((sum, value, i) => sum + value * eye[i], 0);
    return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x), -dot(y), -dot(z), 1]);
  }

  function fitDistance(aspect, fov) {
    // Fit the actual projected vertices, rather than a bounding sphere. This
    // leaves a small border in either desktop or portrait view without clipping.
    const sinA = Math.sin(azimuth), cosA = Math.cos(azimuth);
    const sinE = Math.sin(elevation), cosE = Math.cos(elevation);
    const tanY = Math.tan(fov / 2), tanX = tanY * aspect;
    let distance = 0.1;
    for (let i = 0; i < modelPositions.length; i += 3) {
      const x = modelPositions[i], y = modelPositions[i + 1], z = modelPositions[i + 2];
      const across = x * cosA - z * sinA;
      const up = -x * sinE * sinA + y * cosE - z * sinE * cosA;
      const toward = x * cosE * sinA + y * sinE + z * cosE * cosA;
      distance = Math.max(distance, toward + Math.abs(across) * 1.12 / tanX, toward + Math.abs(up) * 1.12 / tanY);
    }
    return distance;
  }

  function draw() {
    scheduled = false;
    if (!ready) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    const aspect = width / height;
    const fov = Math.PI * 42 / 180;
    const distance = fitDistance(aspect, fov) * zoom;
    const eye = [distance * Math.cos(elevation) * Math.sin(azimuth), distance * Math.sin(elevation), distance * Math.cos(elevation) * Math.cos(azimuth)];
    gl.viewport(0, 0, width, height);
    gl.clearColor(245 / 255, 248 / 255, 247 / 255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projection"), false, perspective(fov, aspect, 0.01, 150));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "view"), false, lookAt(eye));
    gl.uniform3fv(gl.getUniformLocation(program, "eye"), eye);
    gl.drawArrays(gl.TRIANGLES, 0, count);
  }

  function requestDraw() { if (!scheduled) { scheduled = true; requestAnimationFrame(draw); } }
  function adjustZoom(factor) { zoom = clamp(zoom * factor, 0.3, 3.5); requestDraw(); }
  function rotate(dx, dy) { azimuth += dx; elevation = clamp(elevation + dy, -1.55, 1.55); requestDraw(); }
  function action(name) {
    if (!ready) return;
    if (name === "left") rotate(-0.2, 0);
    if (name === "right") rotate(0.2, 0);
    if (name === "in") adjustZoom(0.82);
    if (name === "out") adjustZoom(1 / 0.82);
    if (name === "top") { azimuth = 0; elevation = 1.55; requestDraw(); }
    if (name === "reset") { azimuth = 0.3; elevation = 0.78; zoom = 1; requestDraw(); }
  }
  buttons.forEach(button => button.addEventListener("click", () => action(button.dataset.action)));
  canvas.addEventListener("keydown", event => {
    if (!ready) return;
    const keys = { ArrowLeft: "left", ArrowRight: "right", "+": "in", "=": "in", "-": "out", "_": "out", r: "reset", R: "reset", t: "top", T: "top" };
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault(); rotate(0, event.key === "ArrowUp" ? 0.14 : -0.14);
    } else if (keys[event.key]) { event.preventDefault(); action(keys[event.key]); }
  });
  canvas.addEventListener("wheel", event => {
    if (!ready || document.activeElement !== canvas) return;
    event.preventDefault();
    adjustZoom(Math.exp(clamp(event.deltaY, -100, 100) * 0.002));
  }, { passive: false });
  canvas.addEventListener("pointerdown", event => {
    if (!ready || (event.pointerType === "mouse" && event.button !== 0)) return;
    canvas.focus({ preventScroll: true });
    canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
    canvas.classList.add("dragging");
  });
  canvas.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId)) return;
    const previous = pointers.get(event.pointerId);
    if (pointers.size === 1) {
      rotate(-(event.clientX - previous[0]) * 0.008, (event.clientY - previous[1]) * 0.008);
    } else if (pointers.size === 2) {
      const other = [...pointers.entries()].find(([id]) => id !== event.pointerId)[1];
      const before = Math.hypot(previous[0] - other[0], previous[1] - other[1]);
      const after = Math.hypot(event.clientX - other[0], event.clientY - other[1]);
      if (before > 2 && after > 2) adjustZoom(before / after);
    }
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (!pointers.size) canvas.classList.remove("dragging");
  }
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("lostpointercapture", endPointer);
  canvas.addEventListener("webglcontextlost", event => { event.preventDefault(); fail("The 3D graphics connection was lost. Reload this page to try again."); });
  new ResizeObserver(requestDraw).observe(canvas.parentElement);

  async function initialize() {
    try {
      gl = canvas.getContext("webgl", { alpha: false, antialias: true });
      if (!gl) throw new Error("WebGL unavailable");
      program = gl.createProgram();
      gl.attachShader(program, shader(gl.VERTEX_SHADER, `
        attribute vec3 position;
        attribute vec3 normal;
        uniform mat4 projection;
        uniform mat4 view;
        varying vec3 worldNormal;
        varying vec3 worldPosition;
        void main() {
          worldNormal = normal;
          worldPosition = position;
          gl_Position = projection * view * vec4(position, 1.0);
        }
      `));
      gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        varying vec3 worldNormal;
        varying vec3 worldPosition;
        uniform vec3 eye;
        void main() {
          vec3 n = normalize(worldNormal);
          if (!gl_FrontFacing) n = -n;
          vec3 light = normalize(vec3(-0.4, 0.9, 0.65));
          float diffuse = max(dot(n, light), 0.0);
          float fill = max(dot(n, normalize(vec3(0.8, 0.4, -0.5))), 0.0);
          vec3 halfDirection = normalize(light + normalize(eye - worldPosition));
          float specular = pow(max(dot(n, halfDirection), 0.0), 45.0);
          vec3 base = vec3(0.13, 0.49, 0.44);
          vec3 color = base * (0.42 + 0.6 * diffuse + 0.2 * fill) + vec3(0.22) * specular;
          gl_FragColor = vec4(color, 1.0);
        }
      `));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("WebGL program unavailable");
      gl.useProgram(program);
      gl.enable(gl.DEPTH_TEST);
      const response = await fetch("multimaterial_final.stl");
      if (!response.ok) throw new Error("STL file unavailable");
      const mesh = parseSTL(await response.arrayBuffer());
      modelPositions = mesh.positions;
      for (const [name, data] of [["position", mesh.positions], ["normal", mesh.normals]]) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const attribute = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
      }
      count = mesh.positions.length / 3;
      ready = true;
      status.hidden = true;
      buttons.forEach(button => { button.disabled = false; });
      requestDraw();
    } catch (error) {
      fail("The 3D preview could not load in this browser.");
      console.warn("STL preview:", error.message);
    }
  }
  initialize();
})();
