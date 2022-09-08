# Goals

#### Be Free and Open
Permissive free and open source license, free to fork, use commercially, collaborate, and contribute.  Refer to the [License](https://www.github.com/pax-lang/pax/blob/master/LICENSE.md).

#### Be Portable & Universal
Run on as many screens, devices, and environments as possible.

#### Be High-Performance
Support high-FPS (up to 120fps) rendering & animations and low-latency (<20ms) interactions.

#### Be Accessible
Support accessibility (a11y) at least as well as the target operating system.

#### Be Lightweight
Do more with less:
 - Disk: <100kB wasm / binary baseline
 - Memory: <10MB baseline, maybe better
 - CPU: target benchmark TBD, perhaps `{%core per megapixel}` ⨯ `{active animations, no active animations}` ⨯ `set of supported devices`

#### Be Ergonomic & Familiar
Whenever possible, build off of established conventions and ergonomics — strive to "feel familiar".

#### Be Designable
Support mixing & matching _machine editability_ of Pax alongside _hand-editability_.  Read more about this in the chapter [Designability](./reference-designability.md).

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