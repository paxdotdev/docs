# Hardware Component Model

Components in Pax are inspired by components on a digital circuit board — namely: they are signal-driven, encapsulated, and composable.

Though you wouldn't want to describe an actual circuit with Pax, we can illustrate this parallel with a virtual `AndGateLED` and two signal inputs (`Property<T>`), outputting to a `VirtualLED` component that lights up when the inputs are both true.

```rust
//and_gate.rs
#[pax(
    <VirtualLED signal={self.input_a && self.input_b} >
)]
pub struct AndGateLED {
    input_a: Property<bool>,
    input_b: Property<bool>,
}
```

This `AndGateLED` might be used in some other component's template like:

```rust
<AndGateLED input_a={self.is_validated} input_b={self.is_accepted_by_server} />
```

While contrived, this example may look vaguely familiar if you've used a visual circuit design tool for FPGAs with VHDL or Verilog.  Here's a screenshot from such a tool[1], illustrating how circuit components expose both _inputs_ and _outputs_, and compose with each other for logic flow.

<div style="text-align: center; font-style: italic; font-weight: 100;">
    <img style="width: 95%; border: 10px solid rgb(224,220,219);" src="./aldec-visual-block-designer.png" />
    <br />
    <br />
</div>

Looking at Pax through this lens, _properties_ are component "inputs", while _settings_ are component "outputs".  The hierarchy of components is declared through the template of each component, traversed as a single combined tree by the Pax compiler & runtime.  You can read more in the chapters [Properties & Settings](./start-key-concepts-properties-settings.md), [Expressions](./start-key-concepts-expressions.md), and [Templates](./start-key-concepts-templates.md)

---

[1] Image credit: Aldec, Inc. https://www.aldec.com/en/products/fpga_simulation/designeredition