# Pax Standard Library (`pax-std`)

`pax-std` includes most of Pax's built-in practical functionality.

It also offers a canonical example of creating reusable [components](../key-concepts/components.mdx) and [primitives](../key-concepts/primitives.mdx), exporting them through Rust's module system and using Cargo to load them into other Rust + Pax projects.

The standard library includes:

<!-- TODO: automate creation of these API docs from code comments -->

#### Core

**`<Group />`** - Groups its descendents into a single render node, which may be transformed, causing all children to inherit that hierarchical transformation.  Works intuitively like a `group` in a vector design tool.  Groups do not accept a `size`.

**`<Frame />`** - Exactly like a Group, except requires a `size`, and introduces a clipping context outside of its rectangular boundaries.  Any element that would be rendered outside of those boundaries gets clipped (hidden from view / non-interactable.)

**`<Image />`** - !!unimplemented!! allows embedding and rendering a bitmap or vector image

**`<Scroller />`** - !!unimplemented!! like a Frame, except allows scrolling on any of `x` or `y` axes.  Scrolling will be handled natively via the chassis, and the `Scroller`'s position will reflect the position of the native scrolling container.

**`<Text />`** - allows embedding of text content with basic homogeneous styling.  Text's API may be developed and more primitives may be exposed for more complex use-cases like heterogeneous rich text.

#### Drawing

**`<Rectangle />`** - draws a 2D rectangle with specified Fill and Stroke

**`<Ellipse />`** - draws a 2D ellipse with specified Fill and Stroke

**`<Path />`** - draws a sequence of bezier/line-segment paths, with specified Fill and Stroke

#### Layout

**`<Stacker />`** - lays out elements horizontally or vertically.  Can be nested with other Stackers to create arbitrary rectilinear 2D layouts.
