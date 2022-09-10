# Native Rendering

To render both _native UI elements_ and _native 2D drawing_, every running Pax program renders to **two separate layers,** through different rendering contexts, composited with a unified coordinate space, clipping context, and event handling mechanism.

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

When an element is clipped, for example by placing it into a `Frame` element, each of the _native overlay_ and _canvas underlay_ layers are responsible for doing their own clipping, by separate mechanisms.

The native layer clips using an OS-specific clipping mechanism, for example `.clipped()` on macOS and `clip-path` on Web.

The canvas layer also uses an OS-specific clipping mechanism, but at the GPU/drawing level.

As of Sept 2022, it is expected that there are missing corner cases surrounding occlusion and stacked transparency — more effort will be required to round these out.


### Accessibility & SEO

A lovely emergent property of using native elements for content like text, is that operating-system level accessibility measures (like screen readers) _just work_ out of the box.

For example, if you right-click + inspect a text element in Pax Web, you'll see that it is rendered into the DOM as a `<span>Your text here</span>`, as opposed to rasterized in a canvas.  Screen readers read this content natively.

SEO, or _search engine optimization_ a.k.a. Google / DuckDuckGo compatibility, is also thus solved, allowing crawlers to access text content exactly as they would in any plain ol' Web page or application.


### Footprint

Worth noting about this approach is that it _significantly reduces_ the footprint burden of the Pax runtime.  This hybrid native-canvas/native-elements approach allows Pax to render without needing to bundle a fully featured rendering engine like Skia, which would add megabytes to base footprints.  

For reference, this footprint burden is one of the challenges faced by many cross-platform renderers like Flutter — commonly, such tools require bundling [Skia](https://skia.googlesource.com/skia) and downloading megabytes of data in order to load a single page in a browser.

[Pax aims](./intro-goals-prior-art.md) to keep its base footprint <100kB.


<!--
Scrap: ported from old README

## Appendix B: Description of native rendering approach for text, certain other elements

Rather than introduce virtual controls at the canvas layer, Pax orchestrates a layer of native
controls as part of its rendering process.  This native overlay is used both for form controls like checkboxes
and drop-downs, as well as for rendering native text.

In the browser, for example, a pool of DOM nodes is created for form control elements and text.
Those elements are positioned as an overlay on top of any canvas rendering, allowing for a cohesive
experience that blends dynamic graphics (e.g. vectors, animations) with native familiar UI elements (e.g. text boxes.)

[Visual of DOM "marionette" overlay layer on top of parallaxed graphics layer]

TODO: describe benefits of this approach toward a11y, because e.g. full DOM + content is present in the browser







## Appendix E: Alike and unlike the World Wide Web



Pax's design draws much inspiration from HTML and CSS. In fact, Pax aims to offer
a compelling alternative to Web technologies for delivering cross-platform content, graphics, and GUIs.

#### Inspired by the World Wide Web, Pax is:

content-first -- like HTML
easily machine parsable -- like HTML and CSS
backwards-compatible -- works with any modern browser
universal -- compiles to any device as native app
learnable -- familiar patterns, aims to be easy to pick up
easily deployed -- wrap any program as a as native app or publish to web (JAM stack friendly)


#### What does Pax do differently than the World Wide Web?

built-in expression language -- any property in Pax — like a Rectangle's background color — can be set as an Expression: a spreadsheet-function-like that evaluates dynamically at runtime.  For example, you can react to user inputs or changes in state.
high performance -- not only are Expressions extremely efficient, Pax programs run as "close-to-the-metal" LLVM or WASM code, without the runtime overhead of a garbage collector or interpreter.  
predictable layouts -- Pax dreams of being designed. It uses the coordinate system of common design tools as well as predictable rules for alignment and affine transforms.     
language-agnostic -- built on Rust, can support JS or any other language
extensible -- built around reusable components, down to the standard library. Rendering targets (2D/3D/etc.) and target platforms (iOS/Android/Windows/etc.)
compiled -- rather than interpreted.  TODO: describe alternative to `right-click, view source`
doesn't require a browser or a JavaScript runtime — though Pax is backwards compatible with any modern browser, it can also be packaged as stand-alone native apps for any supported platform.
designable




 -->