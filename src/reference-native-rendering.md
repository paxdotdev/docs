# Native Rendering

To render both _native UI elements_ and _native 2D drawing_, every running Pax program renders to **two separate layers,** through different rendering contexts, but with a unified coordinate space, clipping context, and event handling mechanism.

### Native Overlay

The top layer is the _native overlay_ — simply, a layer of OS-native elements, like SwiftUI `Text` or `Slider` elements on macOS/iOS, and `<span>` or `<button />` in browsers.

Each native element is _transformed_ and _clipped_ in order to fit into the broader rendering context.  For example, if a `Button` is expected to be at the center of the screen, the Pax runtime knows how to transform, size, and clip that native element, to make it "float" in exactly the right place.

### Canvas Underlay

Underneath the native layer is a separate layer, where _drawing_ operations occur.

Any of the drawing primitives like `Rectangle`, `Ellipse`, and `Path` draw to this layer.  In the future, certain effects like drop shadows may draw to this layer as well.  <!--Finally, also in the future, when _text animations_ are supported, i.e. orchestrating animation for individual characters of text, it is likely that text will be rasterized and rendered in this layer as well.-->


### Message-passing via FFI, C Structs

Drawing to the canvas is straight-forward:  for a given operating system, Pax receives a pointer to a native canvas, as uses a polyfill (provided by the open source library [Piet](https://www.github.com/linebender/piet)) to turn a drawing operation like `BezPath` into a operating-system native drawing call.

The result of this is that canvas drawing happens natively — for example, via CoreGraphics on macOS and iOS, Canvas2D in the browser, and Direct2D on Windows.

How does Pax know how to draw native UI elements like Text?

This is done through message-passing.  The Pax engine knows any time a native element is _created_, has its properties _updated_, or is _deleted_ (removed from render tree, e.g. via `if`.)  When any of these "CRUD" operations occur, the runtime sends a message to [the _chassis_](./reference-compilation-model.md), and the chassis is responsible for interpreting that message and drawing the native elements that result.

The messages are sent a C structs via a low-level bridge, using Rust's FFI functionality.  Serialization depends on the platform — for example, messages are passed as `FlatBuffer`s on macOS but `JSON` in the browser (to avoid bloating `.wasm` footprint with a deserialization dependency.)


<!-- TODO: ### Adding new native-rendering elements -->


### Clipping & Occlusion

When an element is clipped, for example by placing it into a `Frame` element, each of the _native overlay_ and _canvas underlay_ layers are responsible for clipping, by separate mechanisms.

The native layer clips using an OS-specific clipping mechanism, for example `.clipped()` on macOS and `clip-path` on Web.

The canvas layer also uses an OS-specific clipping mechanism, but at the GPU/drawing level.

Note that further effort will be required to handle certain combinations of stacking, layering, and opacity.  For example, as of Sept 2022, it is expected that a _partially transparent_ canvas element rendered logically on top of a native element will not render correctly.  Such edge cases can be addressed over time.


### Accessibility & SEO

A lovely emergent property of using native elements for content like text, is that operating-system level accessibility measures (like screen readers) _just work_ out of the box.

For example, if you right-click + inspect a text element in Pax Web, you'll see that it is rendered into the DOM as a `<span>Your text here</span>`, as opposed to rasterized in a canvas.  Screen readers read this content natively.

SEO, or _search engine optimization_ a.k.a. Google / DuckDuckGo compatibility, is also thus solved, allowing crawlers to access text content exactly as they would in any plain ol' Web page or application.


### Footprint

Worth noting about this approach is that it _significantly reduces_ the footprint burden of the Pax runtime.  This hybrid native-canvas/native-elements approach allows Pax to render without needing to bundle a fully featured rendering engine like Skia, which would add megabytes to base footprints.  

For reference, this footprint burden is one of the limitations of many cross-platform renderers like Flutter — commonly, such tools require bundling [Skia](https://skia.googlesource.com/skia) and downloading megabytes of data in order to load a single page in a browser.

[Pax aims](./intro-goals-prior-art.md) to keep its base footprint <100kB.

### Prior art

This composite-layer native rendering mechanism was inspired by a little San Francisco startup called famo.us, which proved the approach's viability in 2014 with its now-abandoned, open source ["mixed mode" JavaScript rendering engine](https://github.com/famous/engine).
