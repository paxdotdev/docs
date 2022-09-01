# Components

The atomic unit of Pax is a `component definition`.  

When you write Pax, you will usually be editing a component definition.  Think of the component definition as a package for a number of different interconnected pieces, or perhaps a cell with a number of different organelles.  Inside a component definition, there may be:

 - A [Template](./start-key-concepts-templates.md)
 - [Settings](./start-key-concepts-properties-settings.md) and [Expressions](./start-key-concepts-expressions.md)
 - [Property Definitions](./start-key-concepts-properties-settings.md)
 - [Event Handlers](./start-key-concepts-event-handlers.md)

A component definition centers around a _Rust struct_, to which a piece of Pax is attached to through the macro `pax` or `pax_root`.  For example, the following defines an empty component called `EmptyComponent`:

```rust
use pax::api::*;
use pax_std::primitives:Group;

#[pax(<Group />)] //a one-element template, simply an empty Group
pub struct EmptyComponent {
    //no properties
}
```

Any component created in Pax can be used inside other components — for example, `EmptyComponent` can be imported and used in another component's template like:

```rust
use pax::api::*;
use crate::EmptyComponent;

#[pax(<EmptyComponent />)] //another one-element template, ultimately still not rendering anything
pub struct StillEmptyComponent {
    //no properties
}
```

Notice that Pax builds off of Rust's import and namespace resolution features, so importing `crate::EmptyComponent` means that you can use `<EmptyComponent />` inside a template.

This "components all the way down" pattern may be familiar if you have used a GUI framework like React or Vue.

TODO: document stand-alone .pax files without Rust: ".html" use-case

