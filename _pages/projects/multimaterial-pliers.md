---
title: "Multi-Material Pliers"
layout: single
permalink: /projects/multimaterial-pliers/
classes: wide
excerpt: "A CHBE 4200 exploration of rigid structures, compliant springs, and print-in-place design."
header:
  teaser: /assets/projects/multimaterial-pliers/pliers-overview.jpg
---

<link rel="stylesheet" href="{{ '/assets/projects/multimaterial-pliers/project.css' | relative_url }}">

<div class="pliers-project" markdown="1">

<p class="project-back"><a href="{{ '/portfolio/' | relative_url }}">← Back to portfolio</a></p>

<div class="project-hero">
  <img src="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}" alt="Black printed pliers with open lattice handles and a pale central element on a tabletop" width="1800" height="1350" fetchpriority="high">
  <div>
    <p class="portfolio-kicker">CHBE 4200 · GitHub Project 02</p>
    <h2>A little flex.<br>A useful grip.</h2>
    <p>An original needle-nose pliers design that brings rigid printed parts together around a circular TPU spring.</p>
    <ul class="portfolio-tags"><li>Digital Fabrication</li><li>Compliant Mechanisms</li><li>3D Printing</li></ul>
  </div>
</div>

<nav class="portfolio-nav" aria-label="Pliers project sections">
  <a href="#concept">Concept</a><a href="#model">3D model</a><a href="#design">Design</a><a href="#print-record">Print record</a><a href="#gallery">Gallery</a><a href="#testing">Testing</a>
</nav>

<aside class="pliers-note"><strong>Built and tested.</strong> With 35 mm jaws and a maximum opening of 20 mm, the prototype can pick up a through-hole resistor and reopen after release. Its original CAD model and improved interlocking connections are documented below.</aside>

## Small parts, deliberate motion {#concept}

The challenge in this CHBE 4200 project is to design and print needle-nose pliers that can grip and pick up through-hole resistors. The narrow jaws need to reach a small component, while the handles need to be comfortable enough to control that grip. I designed this prototype independently, using a circular TPU center as its distinctive spring element. In my functional check, the pliers could pick up a resistor and return to an open position when released.

The prototype shown here has black PLA handles and jaws surrounding a white TPU center. Triangular infill is visible across the upper faces, making the internal structure part of the object's appearance. Three views show the handle shape, the long narrow jaws, and the connection area. Together with the downloadable mesh, these images provide a record of the current geometry and physical build. The parts were prepared in SuperSlicer and printed using a Voron printer, with 31% infill.

### What makes a part print in place?

Print-in-place design builds interacting parts together so that the mechanism can function without conventional assembly. In a rigid mechanism, carefully designed clearances keep neighboring surfaces from fusing while allowing them to rotate or slide. Print orientation and extrusion quality matter because a small amount of unwanted material can obstruct the joint. A compliant mechanism takes another route: part of the structure deforms to permit motion, instead of relying entirely on a sliding contact or separate pin.

For this assignment, the intended spring is a flexible material. The brief also permits an alternative made from two rigid handles and one elastic spring element, provided it can be pressed together by hand without assembly tools. This distinction matters when evaluating a prototype: a printed object with joined components is not automatically a successful print-in-place mechanism. The assembly method and operation need to be documented separately.

## Explore the geometry {#model}

<iframe class="pliers-viewer" src="https://gmail7214985.autodesk360.com/shares/public/SH90d2dQT28d5b602811fe027bc9f37650ac?mode=embed" title="Original multi-material pliers CAD model in Autodesk Fusion" loading="lazy" allow="fullscreen" allowfullscreen></iframe>

<p class="pliers-caption">Explore the original CAD model in the Autodesk viewer. Rotate, zoom, and inspect the connection geometry. If the embedded viewer is unavailable, open the original CAD link or use the alternative STL preview below.</p>

<p><a class="btn btn--primary" href="https://a360.co/4ABHLq7">Open original CAD</a> <a class="btn btn--inverse" href="{{ '/assets/projects/multimaterial-pliers/multimaterial_final.stl' | relative_url }}" download>Download STL · 89 KB</a> <a class="btn btn--inverse" href="{{ '/assets/projects/multimaterial-pliers/model-viewer.html' | relative_url }}">Alternative STL preview</a></p>

The [original CAD model is shared through Autodesk Fusion](https://a360.co/4ABHLq7) and embedded above. The alternative viewer uses the downloadable <code>multimaterial_final.stl</code> mesh. An STL preserves surface geometry but does not retain sketch constraints, feature history, or material assignments; the original design document is the appropriate place to inspect that design information. The complete STL export includes separate copies of parts, so its overall bounding box is not the size of the assembled pliers. Both viewers show geometry rather than a simulation of the pliers in motion.

## The design, from structure to spring {#design}

### Stiff where it grips, flexible where it moves

The broad handles and narrow jaws have different jobs. The handles provide a place to apply force, while the jaws concentrate that action near a small electronic component. The circular TPU element accommodates motion and supplies the spring action that reopens the pliers. Using a flexible center lets the mechanism combine a relatively stiff gripping structure with a region that can deform during operation.

The circular center is the main design idea in this independently developed model. It sits between the black components and provides a compact location for the flexible region. The exposed triangular structure makes the relationship between the center, handles, and jaws easy to see. In a compliant design, changing the spring geometry changes how easily the pliers close: a thinner section may allow more movement, but repeated flexing and durability must also be considered. Interlocking connection features retain the components around the center while the TPU provides the compliant action.

### Iteration: a more secure connection

The main revision focused on the connection interfaces. I changed the mating geometry so that the components could interlock firmly with one another. This made retention a deliberate part of the design: the connections need to hold the parts together while the circular TPU element flexes. A secure interface is especially relevant when the handles are squeezed and released, because the flexible center must remain connected to transmit that motion to the jaws.

The current photographs document the resulting prototype from three angles. They show the final connection area rather than a separate photograph of every revision. I have not recorded a numerical tolerance change or a pull-out strength, so the improvement is described as the change to a firmly interlocking geometry rather than a quantified increase in strength. For another iteration, printing just the mating features would make it easier to compare fit before producing the full handles. Repeated open-and-close cycles would also help assess whether the connection stays secure over time.

## Where else can print-in-place design go?

**Articulated models and hinges.** Prusa's [multi-material printing guide](https://pro.prusa3d.com/guides/multi-material-printing/) demonstrates rigid PLA or PETG combined with flexible TPU for applications such as box hinges and anatomical joints, including a foot model. This is a useful comparison for the pliers: motion can come from a flexible region within an otherwise rigid object. The same guide explains why mechanical interlocking can help connect polymers whose adhesion is weak.

**Integrated robotic mechanisms.** MIT's [Printable Hydraulics research](https://www.csail.mit.edu/news/first-ever-3-d-printed-robots-made-both-solids-and-liquids) combined solid structures and liquid-filled channels in one printing process. A six-legged robot used printed hydraulic components, with the motor and power supply added afterward; the researchers also demonstrated a printed gear pump. These examples extend the idea beyond a simple joint by integrating moving structures and fluid paths that would otherwise require more assembly.

### Which materials work together?

PLA with TPU, or PETG with TPU, are candidate rigid–flexible combinations: one material provides structure and the other provides compliance. That functional pairing does not guarantee a strong bond or an easy print. Prusa's guide discusses these combinations and interface design, while [UltiMaker's TPU 95A guidance](https://support.ultimaker.com/s/article/1667337612195) classifies its mixed-material combinations as experimental and points to interlocking as a way to improve bonding. Printer capability, compatible process conditions, and interface testing all matter. This prototype uses TPU at the center; its exact grade or hardness has not yet been recorded.

## Dimensions & print record {#print-record}

### Specifications

<div class="pliers-table-wrap" tabindex="0" role="region" aria-label="Pliers specifications" markdown="1">

| Specification | Current record |
| :--- | :--- |
| Intended task | Grip and pick up through-hole resistors |
| Return mechanism | Circular TPU spring; automatic reopening confirmed in the author's functional check |
| Jaw length | 35 mm (3.5 cm) |
| Maximum jaw opening / capacity | 20 mm (2 cm) |
| STL units / scale | Not encoded in STL; CAD export units need confirmation |
| Available geometry | Original Autodesk Fusion CAD share and downloadable STL |

</div>

The 35 mm jaw length and 20 mm maximum opening are the dimensions reported for the physical prototype. They describe the working end of the tool, not the bounding box of the entire STL export. The narrow jaws provide access to small components, while the usable opening depends on the flexible center and the assembled geometry. Resistor pickup and automatic reopening were confirmed in my functional check; a quantified load capacity has not been established.

### Print settings

<div class="pliers-table-wrap" tabindex="0" role="region" aria-label="Print settings awaiting the actual slicer record" markdown="1">

| Setting | Rigid parts | Central element |
| :--- | :--- | :--- |
| Filament / material grade | Black PLA | White TPU; grade / hardness unrecorded |
| Printer and slicer | Voron / SuperSlicer | Voron / SuperSlicer |
| Layer height | SuperSlicer profile default; exact value unrecorded | SuperSlicer profile default; exact value unrecorded |
| Nozzle diameter | Not recorded yet | Not recorded yet |
| Nozzle / bed temperature | Not recorded yet | Not recorded yet |
| Infill pattern / percentage | 31% reported; triangular pattern visible | 31% reported for the project; per-part setting unconfirmed |
| Walls / top and bottom layers | Not recorded yet | Not recorded yet |
| Print speed / supports / orientation | Not recorded yet | Not recorded yet |

</div>

The table records the settings that can currently be confirmed. Layer height depends on the selected nozzle and print profile: the [upstream Voron profile library](https://github.com/slic3r/slic3r-profiles/blob/ca25c7ec55dcc6073da61e39692c321cdb6497dc/Voron.ini#L149) specifies a 0.15 mm default for a 0.4 mm nozzle, while other nozzle presets differ. This is a reference, not a recovered setting for this print. The original SuperSlicer project or G-code is needed to confirm the actual layer height and temperatures.

## A closer look {#gallery}

<div class="pliers-gallery">
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}" alt="Overview of the pliers, with narrow jaws at left and wide handles at right" width="1800" height="1350" loading="lazy"></a><figcaption><strong>01 / Overall form.</strong> Long handles and narrow jaws arranged around the center.</figcaption></figure>
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-joint.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-joint.jpg' | relative_url }}" alt="Alternate view showing the circular white TPU center between the black handles and jaws" width="1800" height="1350" loading="lazy"></a><figcaption><strong>02 / Circular spring.</strong> The TPU center and its interfaces with the black components.</figcaption></figure>
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-handles.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-handles.jpg' | relative_url }}" alt="View along the black handles toward the central element and jaws, showing exposed triangular infill" width="1800" height="1350" loading="lazy"></a><figcaption><strong>03 / Handle structure.</strong> Exposed triangular infill across the upper faces.</figcaption></figure>
</div>

All three images document the same supplied prototype from different angles. Earlier iteration photographs can be added when their sequence and design changes are known.

## Does it grip and spring back? {#testing}

<div class="pliers-test-note"><p class="portfolio-kicker">Working demonstration · pending</p><h3>The next piece of evidence is motion.</h3><p>A short recording should show the handles being squeezed, the jaws picking up a through-hole resistor, and the pliers reopening after release. The resulting GIF will document actual operation here.</p></div>

A useful test separates three questions: can the jaws reach and hold the resistor, does the central element recover after release, and do the connections remain secure through repeated cycles? My functional check confirms resistor pickup and automatic reopening. A recording will provide visible evidence of those actions, while repeated-cycle testing remains a next step. No quantified success rate, load capacity, or cycle life is claimed. A rotating CAD model or a slideshow of still photographs would show appearance, but would not replace the required demonstration of the physical pliers working.

</div>
