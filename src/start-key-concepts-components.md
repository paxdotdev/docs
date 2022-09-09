# Components

The atomic unit of Pax is a `component definition`. A component definition for `MyNewComponent` may look like:

```rust
// src/my-new-component.rs
use pax::api::*;

// This #[pax()] macro declares component `MyNewComponent`
#[pax(
    <Group>
        <Stacker cells=2 direction=Vertical>
            <Text>"I'm feelin' fine as frogs' hair!"</Text>
            <Rectangle fill={rgb(100%, 0, 0)} />
        </Stacker>
    </Group>
)]     
pub struct MyNewComponent {
    pub my_property_a: Property<i64>
    pub my_property_b: Property<bool>
}
```


You can think of the component definition as a package for a number of different interconnected pieces, or perhaps a cell with a number of different organelles.  


Inside a component definition, there may be:

 - A [Template](./start-key-concepts-templates.md)
 - [Settings](./start-key-concepts-properties-settings.md) and [Expressions](./start-key-concepts-expressions.md)
 - [Property Definitions](./start-key-concepts-properties-settings.md)
 - [Event Handlers](./start-key-concepts-event-handlers.md)

A component definition centers around a _Rust struct_, to which a piece of Pax is attached to through the macro `pax` or `pax_root`.  For example, the following defines an empty component called `EmptyComponent`:

```rust
use pax::api::*;
use pax_std::primitives::Group;

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

This "components all the way down" pattern may be familiar if you have used a GUI framework like React or Vue.

Notice that Pax builds off of Rust's import and namespace resolution mechanisms, so importing `crate::EmptyComponent` to a `.rs` file means that you can use `<EmptyComponent />` inside a template in that file.

<!-- TODO: document stand-alone .pax files without Rust: ".html" use-case -->
You can read more about Pax components in the chapter [Hardware Component Model](./reference-hardware-component-model.md).
<br />
<br />
<br />


<div style="text-align: center; font-style: italic; font-weight: 100;">
    <img style="width: 400px; border: 10px solid rgb(224,220,219);" src="./DALL·E a biological cell with computer chips for organelles.png" />
    <br />
    A biological cell with computer chips for organelles
    <br />
    <br />
</div>
