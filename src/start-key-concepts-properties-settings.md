# Properties & Settings

`Properties` and `Settings` are two sides of the same idea, so they share a chapter in this book.


<div style="text-align: center; font-style: italic; font-weight: 100;">
    <br />
    <img style="width: 400px; border: 10px solid rgb(185,204,204);" src="./DALL·E two illuminated switchboards_ one light one dark..psd.png" />
    <br />
    Two illuminated switchboards: one light, one dark
    <br />
    <br />
</div>

Recall that the atomic unit of Pax is the [component](./start-key-concepts-components.md).  Components pass data to each other through `properties` and `settings`.[1]  


## Properties

`Properties` could be summarized as _inputs_ to a component — they are the _properties_ of a component that are exposed to consumers.  For example, `Stacker`, the layout component, exposes a property `direction`, which dictates whether `Stacker` lays out its cells horizontally or vertically.

Properties are also used internally within a component as state containers, similar in purpose to [`state` in React](https://reactjs.org/docs/state-and-lifecycle.html).  A component's properties may be referred to by any of that component's expressions like: `{self.some_property && self.some_other_property}`

Properties are defined on Rust structs, such as `counter` below:

```rust
use pax_lang::api::*;

#[derive(Pax)]
#[inlined(
    <Text text={counter}></Text>
)]
pub struct MyComponent {
    counter: Property<i64>,
}
```

Notice that `counter` is a member of a Pax-attached Rust struct, with a `pax_lang::api::Property<T>` wrapper around its type.

<!-- appendix?:  In the above example, the component `MyComponent` will expose the property `counter`.  Note that the `Property<T>` wrapper type is not necessary for compilation, but `Property<T>` _is_ necessary for Pax to be able to access that property through Expressions, Settings, and Defaults.  In other words, you can make a struct property "private" from Pax by omitting the `Property<T>` wrapper. -->

<!--
#### Property Defaults

TODO: !!Not yet implemented!! Defaults can be set for a component by declaring a `@default{}` block, including a list of Pax settings.  A default value is the initial value for a property, in the case where no settings are applied.


```rust
use pax_lang::api::*;

#[pax(
    //... some content

    @defaults { // !!@defaults support is not yet implemented!!
        counter: 42 // if a consumer of `<MyComponent />` doesn't set `counter`,
                    // the value will default to 42
    }
)]
pub struct MyComponent {
    counter: Property<i64>,
}
```
-->

## Settings

`Settings` are declarations of values.  If `Properties` are _inputs_ to a component, then `Settings` are _outputs_.  When composing the definition of a component or program, you _set_ the properties of any element in order to specify behavior or appearance.  

Building off of the `Stacker` example above, any component that instantiates a `Stacker` in its template has the opportunity to apply a _setting_ to `Stacker`, to _set_ its `direction` property.

Let's use the above component inside a new component, `AnotherComponent`.

```rust
use pax_lang::api::*;
use crate::MyComponent;

#[pax(
    <MyComponent counter={self.num_clicks * 2} />
)]
pub struct AnotherComponent {
    num_clicks: Property<i64>,
}
```

In this example, `MyComponent`'s `counter` property gets _set_ — the declaration of a value, in this case an expression `{self.num_clicks * 2}`, is a _setting_.  

Settings declarations may either be literal values or expressions.  `counter=5` would be another valid setting for the example above.

### Declarative Settings Syntax

Settings can be declared with two different syntaxes: `inline settings` or `settings block` syntax.  Each syntax has access to the exact same properties, and `expressions` can be bound in either place.

#### Inline Settings

Inline settings are authored _inline_ into a template definition.  You might recognize this syntax as nearly identical to _XML attributes_.  Example:

```pax
//inside a template definition
<SomeComponent some_property="SomeSetting" />
```

Unlike XML, Pax's inline settings syntax supports values beyond string literals, such as enums, symbolic identifiers, and numeric literals.  Pax inline settings may also be bound to expressions, wrapped in `{}`, such as:
```pax
//`self.current_width` refers to a property from the attached Rust struct, not shown here.
<Rectangle width={self.current_width} height={self.current_width * 1.5} />
```

#### Settings blocks

As an alternative to inline syntax, settings may be authored in a CSS-like syntax, binding a block of settings to an element by id.  For example:

```rust
#[pax(
    <Rectangle id=my_rect>

    @settings {
        #my_rect {
            fill: rgb(100%, 100%, 0)
        }
    }
)]
```

Every property that is available inline is also available in the settings block syntax, and settings can be mixed and matches across syntaxes.

<!-- TODO: document `@linux { ... }` and @{some_exp}{ ... } etc., media-query-like settings sections -->

#### Settings precedence 

When both an inline setting and a setting block apply settings for the same property, the inline setting takes precedence.  This "cascading" behavior is inspired by HTML and CSS.  When a `property` is `set` at runtime, the latest set value takes precedence.  


### Setting Properties at Runtime

For a `Property<T>`, the following API is exposed to Rust logic at runtime:

#### `.set`

Set a property value

#### `.ease_to`

Ease a property value over time with an easing curve (generally, for animation)

#### `.ease_to_later`

Same as `ease_to`, but enqueues the specified transition to occur after all currently enqueued transitions are completed.

<!--
#### `.to_default` | `.ease_to_default` | `.ease_to_default_later`
TODO !!Not yet implemented!! 
Along with support for `@default` values, these methods will enable reverting / setting / easing to the default value for a property at runtime.
-->


---

[1] The relationship between properties & settings is inspired by [digital circuits.](./reference-hardware-component-model.md).
