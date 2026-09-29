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
  <img src="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}" alt="Black printed pliers with open lattice handles and a pale central element on a tabletop" width="2400" height="1800" fetchpriority="high">
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

The current photographs document the resulting prototype from three angles. They show the final connection area rather than a separate photograph of every revision. No numerical tolerance change or pull-out strength is included in this record, so the improvement is described as the change to a firmly interlocking geometry rather than a quantified increase in strength. For another iteration, printing just the mating features would make it easier to compare fit before producing the full handles. Repeated open-and-close cycles would also help assess whether the connection stays secure over time.

## Where else can print-in-place design go?

**Articulated models and hinges.** Prusa's [multi-material printing guide](https://pro.prusa3d.com/guides/multi-material-printing/) demonstrates rigid PLA or PETG combined with flexible TPU for applications such as box hinges and anatomical joints, including a foot model. This is a useful comparison for the pliers: motion can come from a flexible region within an otherwise rigid object. The same guide explains why mechanical interlocking can help connect polymers whose adhesion is weak.

**Integrated robotic mechanisms.** MIT's [Printable Hydraulics research](https://www.csail.mit.edu/news/first-ever-3-d-printed-robots-made-both-solids-and-liquids) combined solid structures and liquid-filled channels in one printing process. A six-legged robot used printed hydraulic components, with the motor and power supply added afterward; the researchers also demonstrated a printed gear pump. These examples extend the idea beyond a simple joint by integrating moving structures and fluid paths that would otherwise require more assembly.

### Which materials work together?

PLA with TPU, or PETG with TPU, are candidate rigid–flexible combinations: one material provides structure and the other provides compliance. That functional pairing does not guarantee a strong bond or an easy print. Prusa's guide discusses these combinations and interface design, while [UltiMaker's TPU 95A guidance](https://support.ultimaker.com/s/article/1667337612195) classifies its mixed-material combinations as experimental and points to interlocking as a way to improve bonding. Printer capability, compatible process conditions, and interface testing all matter. This prototype uses white TPU 95A at the center, as confirmed by the author. The 95A designation describes Shore hardness; spring geometry, wall count, and infill also affect how the printed element flexes.

## Dimensions & print record {#print-record}

### Specifications

<div class="pliers-table-wrap" tabindex="0" role="region" aria-label="Pliers specifications" markdown="1">

| Specification | Current record |
| :--- | :--- |
| Intended task | Grip and pick up through-hole resistors |
| Return mechanism | Circular TPU spring; automatic reopening confirmed in the author's functional check |
| Jaw length | 35 mm (3.5 cm) |
| Maximum jaw opening / capacity | 20 mm (2 cm) |
| STL units / scale | STL is unitless; match the CAD export units on import and check the jaw against the reported 35 mm length before slicing |
| Available geometry | Original Autodesk Fusion CAD share and downloadable STL |

</div>

The 35 mm jaw length and 20 mm maximum opening are the dimensions reported for the physical prototype. They describe the working end of the tool, not the bounding box of the entire STL export. The narrow jaws provide access to small components, while the usable opening depends on the flexible center and the assembled geometry. Resistor pickup and automatic reopening were confirmed in my functional check; a quantified load capacity has not been established.

### Print settings

**Prototype record.** The build used black PLA for the rigid parts, white TPU **95A** for the spring, a Voron printer, and SuperSlicer. The reported infill setting was **31%**, and the photographs show triangular infill in the rigid parts. The author recalls using a default layer-height profile and possibly a **0.4 mm nozzle**, but the saved slicer project and G-code are not available to verify those details. The TPU brand and its individual infill setting cannot be recovered from the photographs.

### Reference settings for a repeat print

<aside class="pliers-note"><strong>Researched starting settings.</strong> The values below form a proposed setup for a new print. Tune them for the selected filament and printer; they are not a recovered log of the original build or a tested reproduction profile.</aside>

<div class="pliers-table-wrap" tabindex="0" role="region" aria-label="Reference print settings for PLA and TPU 95A" markdown="1">

| Setting | Rigid parts — PLA | Circular spring — TPU 95A |
| :--- | :--- | :--- |
| Material | Black PLA | White TPU 95A; use the chosen brand's filament profile |
| Printer / slicer | Voron / SuperSlicer | Voron / SuperSlicer |
| Nozzle diameter | 0.4 mm reference nozzle | 0.4 mm reference nozzle |
| Layer height | 0.15 mm; 0.20 mm first layer | 0.15 mm; 0.20 mm first layer, adopted as a starting geometry setting |
| Nozzle temperature | 215 °C first layer; 210 °C thereafter | Start at 230 °C; Prusament TPU 95A lists 220–240 °C |
| Bed temperature | 60 °C | Start at 60 °C; Prusament TPU 95A lists 55–75 °C |
| Infill | 31%, triangles, following the project record and visible pattern | 31%, triangles, proposed for the first trial; tune for spring response |
| Walls / perimeters | 3 | 3 as an initial trial |
| Top / bottom solid layers | 0 top / 6 bottom for the exposed-infill variant | 7 top / 6 bottom as an initial trial |
| Print speed | Proposed cap of 40 mm/s for perimeters and infill; 20 mm/s first layer | Start at 20 mm/s, including the first layer |
| Supports | Start disabled; inspect every layer around the interlocks before printing | Start disabled; inspect the spring and connection features before printing |
| Orientation | Proposed: broad handle and jaw faces flat on the bed | Proposed: circular spring plane parallel to the bed |

</div>

**How this setup was chosen.** The pinned Voron profile supplies the 0.4 mm nozzle option, 0.15 mm layers, 0.20 mm first layer, three perimeters, and seven top / six bottom layers. Setting the PLA top layers to zero is a proposed way to reproduce the exposed triangular infill seen in the photographs. The PLA speed cap is a conservative project choice based on the profile's 40 mm/s external-perimeter speed, rather than its faster internal-perimeter and infill settings. The TPU infill, walls, and solid layers are trial values: on a small spring, solid shells may occupy much of the section, so check the sliced toolpaths and adjust after a flex test.

**Material-specific tuning.** The TPU temperature range above belongs to Prusament TPU 95A and is a reference for the selected hardness, not identification of the original spool. Follow the actual filament manufacturer's range and tune on the available Voron. Prusa's flexible-material guide recommends about 20 mm/s. For Prusament TPU 95A on smooth PEI, its guide calls for a glue-stick separation layer.

**Suggested fabrication workflow.** For the hand-assembled version allowed by the brief, prepare the rigid pieces and spring as separate material jobs, check their mating features in the slicer, then trial-fit the cooled parts. The proposed flat orientations and support choices need checking against the actual geometry. Verify the 35 mm jaw dimension after import, test one connection before printing the full set, and save the final SuperSlicer project and G-code with the results.

## A closer look {#gallery}

<div class="pliers-gallery">
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-overview.jpg' | relative_url }}" alt="Overview of the pliers, with narrow jaws at left and wide handles at right" width="2400" height="1800" loading="lazy"></a><figcaption><strong>01 / Overall form.</strong> Long handles and narrow jaws arranged around the center.</figcaption></figure>
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-joint.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-joint.jpg' | relative_url }}" alt="Alternate view showing the circular white TPU center between the black handles and jaws" width="2400" height="1800" loading="lazy"></a><figcaption><strong>02 / Circular spring.</strong> The TPU center and its interfaces with the black components.</figcaption></figure>
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-handles.jpg' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-handles.jpg' | relative_url }}" alt="View along the black handles toward the central element and jaws, showing exposed triangular infill" width="2400" height="1800" loading="lazy"></a><figcaption><strong>03 / Handle structure.</strong> Exposed triangular infill across the upper faces.</figcaption></figure>
</div>

Three views of the completed prototype show the overall form, circular TPU spring, and exposed triangular infill.

## Does it grip and spring back? {#testing}

<div class="pliers-test-note"><p class="portfolio-kicker">Working demonstration</p><h3>From handle motion to jaw movement.</h3><p>Two recordings show the physical prototype being squeezed and released. The close-up focuses on the jaws and circular TPU center; the wider view shows the handles and jaws moving together.</p></div>

<div class="pliers-gallery pliers-demos">
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-spring-action.gif' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-spring-action.gif' | relative_url }}" alt="Looping close-up of the pliers opening and closing around the white TPU center" width="360" height="640" loading="lazy" decoding="async"></a><figcaption><strong>01 / Jaw and spring motion.</strong> A close-up of the jaws and circular TPU center during opening and closing.</figcaption></figure>
  <figure><a href="{{ '/assets/projects/multimaterial-pliers/pliers-handle-action.gif' | relative_url }}"><img src="{{ '/assets/projects/multimaterial-pliers/pliers-handle-action.gif' | relative_url }}" alt="Looping demonstration of a hand squeezing and releasing the pliers handles to move the jaws" width="360" height="640" loading="lazy" decoding="async"></a><figcaption><strong>02 / Handle operation.</strong> Squeezing and releasing the broad handles moves the narrow jaws.</figcaption></figure>
</div>

Resistor pickup and automatic reopening were confirmed in my functional check; these clips focus on the opening and closing motion. Repeated-cycle durability remains a next step. No quantified success rate, load capacity, or cycle life is claimed.

</div>
