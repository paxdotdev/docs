# Rendering & Compositing

Pax combines platform-specific elements — like text and form controls — with vector drawing layers.

This combination enables certain deeply native functionalities — like text selection, scrolling, and native UI kits — along with the expressiveness of a vector drawing API.

Our solution composites, clips, and occludes layers of native elements & vector elements to create a single cohesive scene.

### Native Layers

The top layer is the _native overlay_ — simply, a layer of OS-native elements, like SwiftUI `Text` or `Slider` elements on macOS/iOS, and `<span>` or `<button />` in browsers.

Each native element is _transformed_, _clipped_, and layered for _occlusion_, based on the node's position in the scene graph.  For example, if a `Button` is expected to be at the center of the screen, the Pax runtime knows how to transform, size, and clip that native element (e.g. a DOM `<button />`), to make it "float" in exactly the right place on the screen.

### Canvas Layers

Vector drawing operations occur on canvas layers.

`Rectangle`, `Ellipse`, and `Path` draw to this type of layer, for example.  Vector layers are rendered to with platform-specific drawing APIs.

### Accordioning & layer optimization

The Pax runtime manages expanding and contracting the layers needed to perform occlusion, so that native elements and vector elements may be stacked in between each other. 

Pax Engine manages these layers dynamically, creating and destroying them as needed to handle the different 

Awareness of this compositing mechanism is useful when performance-tuning Pax apps.  Be aware that too many layers of stacked native & text elements can have outsize memory and CPU impact due to the need to maintain several vector contexts.

### GPU vs. CPU rendering

We have achieved GPU rendering by tesselating with Lyon and rendering with wgpu — however, the wasm footprint for the wgpu WebGL backend at our time of integration was >10MB, which was a showstopper.  Porting again to GPU rendering should be easily done, but hasn't been prioritized.

GPU rendering is close at hand and will be prioritized based on feedback, presumably when CPU rendering becomes a bottleneck.


### Message-passing via FFI / C bridge

Drawing to the canvas is straight-forward:  for a given operating system, Pax receives a pointer to a native canvas, as uses a polyfill (provided by the open source library [Piet](https://www.github.com/linebender/piet)) to turn a drawing operation like `BezPath` into a operating-system native drawing call.

The result of this is that canvas drawing happens natively — for example, via CoreGraphics on macOS and iOS, Canvas2D in the browser, and Direct2D on Windows.

How does Pax know how to draw native UI elements like Text?

This is done through message-passing.  The Pax engine knows any time a native element is _created_, has its properties _updated_, or is _deleted_ (removed from render tree, e.g. via `if`.)  When any of these "CRUD" operations occur, the runtime sends a message to [the _chassis_](./compilation-model.md), and the chassis is responsible for interpreting that message and drawing the native elements that result.

The messages are sent a C structs via an FFI bridge.  Serialization depends on the platform — for example, messages are passed as `FlexBuffer`s on macOS / iOS and `JSON` in the browser



### Accessibility & SEO

An emergent property of using native elements for content like text: operating-system level accessibility measures (like screen readers) _just work_ out of the box.

For example, if you right-click + inspect a text element in Pax Web, you'll see that it is rendered into the DOM as a `<span>Your text here</span>`, as opposed to rasterized in a canvas.  Screen readers read this content natively.

SEO, or _search engine optimization_ a.k.a. Google / DuckDuckGo compatibility, is also thus solved, allowing crawlers to access text content exactly as they would in any plain ol' Web page or application.


### Footprint

Worth noting about this approach is that it significantly reduces the footprint burden of the Pax runtime.  This hybrid native-canvas/native-elements approach allows Pax to render without needing to bundle a fully featured rendering engine like Skia, which would add megabytes to base footprints.  

For reference, this footprint burden is one of the challenges faced by many cross-platform renderers like Flutter — commonly, such tools require bundling [Skia](https://skia.googlesource.com/skia) and downloading megabytes of data in order to load a single page in a browser.

[Pax aims](../intro-priorities-and-prior-art.md) to keep its base footprint <100kB.




