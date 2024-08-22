


# Pax’s Priorities

## Made for Shipping

**Native builds**: Pax compiles to pure machine-code native binaries for each target platform.  Pax today includes native runtimes for macOS desktop, iOS mobile, and browsers via WebAssembly

**Tiny footprint**: <100KB network footprint for WASM builds, enabled by our [unique native compositor](https://docs.pax.dev/reference-native-rendering.html). For native builds we target a <1MB binary footprint.

**Top-tier performance:** 240fps on supporting hardware, achieved in early builds, will be an ongoing priority. GPU rendering [has been achieved](https://github.com/paxproject/pax/pull/76) but requires work for production-readiness (namely: WASM footprint reduction.)

**Accessibility:** Pax supports screen readers on each implemented platform, as well as search engine optimization (SEO) in browsers.  This is enabled by compositing _native elements_ — for example, DOM nodes for the web and SwiftUI elements for macOS/iOS — with virtual canvas drawings, for specific primitives like text and form controls.

## Learnable & Powerful

**Inspired by JSX** — anyone who has used React should find Pax familiar.  The syntax, from the XML base flavor through to curly-brace-wrapped expressions, was designed to echo React.  Nonetheless, by compiling into machine code Pax maintains the power, low overhead, and extensibility of systems programming and the Rust ecosystem.

**Modular & composable** — All Pax components are built around Rust structs and exposed through Rust’s module system, for example across Rust crates.  Pax’s standard library is exposed as components and everything is swappable and extensible.

**Creatively expressive** — Animations, mix & match UI elements with design elements, free-form positioning melded with responsive layouts

**Multiple programming languages** (future) — today we support only Rust for application logic, but plan to extend this to at least TypeScript/Javascript and likely C++, Go, Python, and .NET.

## Designable
Pax’s 100% declarative _user interface description language_ is readable & writable by machines as well as humans.   The language is designed to encode the union of: `anything you might express in a Photoshop file` and `anything you might build in React.`  This includes vector elements, responsive layouts, form controls, and custom, composable components.

Pax the language is just data — declarative markup and expressions.  Turing-complete logic is handled by the accompanying source code (e.g. Rust), where Rust functions can be bound to Pax events, e.g. `<Button @submit=some_rust_function />`, and Pax expressions can refer to Rust struct data like `<Rectangle x={self.dynamic_x_value} />`

Further, Pax’s layout engine renders in “design tool coordinates,” the same coordinate space as a tool like Photoshop or Figma.  You can imagine a visual tool statically opening a Pax codebase, performing visual edits, and persisting those edits as source code — all while offering a Figma-like (or Flash-like) creative experience.

We call this principle “designability.”[1]

Our team is building a commercial, collaborative visual designer for Pax, so people who don’t write code can build software hand-in-hand with those who do. [JOIN THE EARLY ACCESS LIST](https://jeaattwds6e.typeform.com/to/aDG3OH7k)

<br />
<br />
<br />

# Prior Art & Inspiration

#### Verilog, VHDL
For highly functional & highly declarative logic, and for [designable](./reference-designability.md) logic, teaching that it is possible for visual tooling to read & write code that can also be read & written by hand.

#### Macromedia Flash, Dreamweaver
For instilling the paradigm of _design tools that create software_ (contrast with: _design tools that create pictures._)

Flash specifically, for teaching that it is possible to bring a higher level of _art_ to interactive digital media, if we empower artists with the right tools and better-enable collaboration between designers & developers.

#### The World Wide Web, HTML, CSS
For instilling a paradigm of openness, for becoming the substrate of the free exchange of human knowledge, for championing accessibility, for achieving a nearly ubiquitous VM & runtime, for achieving a "zero-trust" application runtime, and for establishing a _lingua franca_ of UI authoring + ergonomic expectations.

#### React, Vue, Angular
For establishing the "components all the way down" approach to UI authoring; for bringing this approach to the mainstream, and for helping push the modern Web platform toward its pinnacle form.

#### Flutter, Xamarin, Unity, Qt, Electron, and React Native
For their various approaches to cross-platform application runtimes.

#### Visual Basic, ASP.NET
VB for its visual building approach to GUIs and ASP.NET for championing the "code-behind" model, separating concerns of _UI content and behavior_ from _application logic,_ and doing so in a multi-language way.

#### VisiCalc, Lotus 1-2-3, Excel
For teaching that writing simple expressions (formulae) is accessible to a huge audience of users, beyond traditional developers.  For fundamentally transforming how humans interact with data & computers.

#### The Nintendo Entertainment System
For doing so much with so little, for years of childhood wonder, exploration, and reflex honing, and for the model of the "cartridge + console," borrowed architecturally for Pax's [compilation model.](./reference-compilation-model.md).
