# Anatomy of a Pax Program

## Components

Every Pax program defines one or more _component_, including an optional _root component._  That root component may be mounted full-window into various platform-specific native apps, or in the future, may embedded as a UI component inside other codebases, such as existing native iOS apps or Web apps.  

Pax programs may also define and expose non-root components, such as when authoring a library of reusable components.  `pax-std` is an example of a "library" crate — indeed, this model is based on Cargo's design for `bin` vs. `lib` crates.

For visual reference, consider the following example, which declares a component called `HelloWorld`:

```rust
//Rust
use pax::api::Transform2D::*;
use pax_std::primitives::Rectangle;

#[pax(
    <Rectangle @click=self.handle_click transform={
        anchor(50%, 50%) *
        align(50%, 50%) *
        rotate(self.theta)
    }/>
)]
pub struct HelloWorld {
    theta: f64,
}

impl HelloWorld {
    pub fn handle_click(&mut self, args: ArgsClick) {
        let old_theta = self.theta.get();
        
        self.theta.ease_to(
            old_theta + f64::PI() * 3.0, //new value
            240,                         //duration of transition, frames
            EasingCurve::OutBack,        //curve to use for interpolation 
        );
    }
}
```

The primary components of a Pax program are:
 - **Components** — The building blocks of programs
 - Primitives




## Templates

```
<Group>
    <Rectangle />
</Group>
```

Each component declares a template in an XML-like syntax, which describes how its UI should be displayed.  Any element in that template can have its settings assigned as XML key-value pairs.

A template describes the _content_ of a scene or GUI.


## Event handlers

In the above example, `on_click=self.handle_click` binds a the `handle_click` method defined in the host codebase to the built-in `click` event which Pax fires when a user clicks the mouse on this element.  Events fire as "interrupts" and are allowed to execute arbitrary, side-effectful, imperative logic — anything you can write or use in Rust.

It is inside event handlers that you will normally change property values with the [properties API](/reference-)

Pax includes a number of built-in lifecycle events like `@will_render` and user interaction events like `@click` and `@tap`.  These can all be bound and handled in the same manner.


## Properties & Settings

`Properties` and `Setting`s are two sides of the same idea.

`Properties` could be summarized as _inputs_ — they are the _properties_ of a component that are exposed to consumers.  For example, `Stacker`, the layout component, exposes a property `direction`, which tells `Stacker` whether to lay out its cells horizontally or vertically.

Conversely, `Settings` are _outputs_ — when composing the definition of a component or program, you _set_ the properties of any element in order to specify behavior or appearance.

Though they are two sides of the same idea, defining _properties_ is quite different from defining _settings_: 

### Defining Properties

Properties are defined on Rust structs, such as:

```rust
#[pax(
    //... some content
)]
pub struct MyComponent {
    counter: i64,
}
```
In the above example, the component `MyComponent` will expose the property `counter`.

### Property Defaults

TODO: Defaults can be set for a component by declaring a `@default{}` block, including a list of Pax settings.


```rust
#[pax(
    //... some content
)]
pub struct MyComponent {
    counter: i64,
}
```

### Defining Settings

Let's use the above component inside a new component, `AnotherComponent`.

```rust
use crate::MyComponent;

#[pax(
    <MyComponent counter={self.num_clicks * 2} />
)]
pub struct AnotherComponent {
    num_clicks: i64,
}
```

In the above example, `MyComponent` is used inside the template for `AnotherComponent`, then its property `counter` is _set_, in this case bound to an expression `{self.num_clicks * 2}`.  



### Settings Syntax

Settings can be written with two different syntaxes: `inline settings` or `settings block` syntax.  Each syntax has access to the exact same properties, and `expressions` can be bound in either place.

### Inline Settings

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


### Settings blocks




### Settings precedence 

When both an inline setting and a setting block define settings for the same property, the inline setting takes precedence.  This "cascading" behavior is inspired by HTML and CSS.  When a `property` is `set` at runtime, the latest set value takes precedence.  



### Settings at Runtime



    Attach macro
    wrap in `Property<T>`
    get/set
    ease, animations

Properties act as "inputs" — they say, "these are the properties that can be _set_ on this component — via _settings_."



#### Expressions

Properties can have literal values, like `transform=translate(200,200)` or `fill=Color::rgba(100%, 100%, 0%, 100%)`

Or values can be dynamic *expressions*, like:
`transform={translate(200,y_counter) * rotate(self.rotation_counter)}` or `fill={Color::rgba(self.red_amount, self.green_amount, 0%, 100%)}`

The mechanism behind this is in fact an entire language, a sub-grammar of Pax called 'Pax Expression Language' or PAXEL for short.[*]

PAXEL expressions have _read-only_ access to the scope of their containing component.
For example: `self.some_prop` describes "a copy of the data from the attached Rust struct member `self.some_prop`"

PAXEL expressions are noteworthy in a few ways:
- Any PAXEL expression must be a pure function of its inputs and must be side-effect free.  
- As a result of the above, PAXEL expressions may be aggressively cached and recalculated only when inputs change.
- In spirit, PAXEL expressions act a lot like spreadsheet formulas, bindable to any property in Pax.

`Expressions` must exist at compile-time, because the Pax compiler builds each `expression` into an entry in the cartridge vtable, which the runtime knows how to evaluate and cache.  As of this authoring, expressions cannot be authored arbitrarily at runtime (no `eval`-style functionality.)




[*] PAXEL is similar to Google's Common Expression Language (CEL), but CEL was not a suitable fit for Pax due to its footprint — being written in Go, CEL adds
a prohibitive overhead to compiled binaries (1-2MB) vs. Pax's total target footprint of <100KB.  Pax also has subtly distinct goals
vs CEL and is able to fine-tune its syntax to make it as ergonomic as possible for this particular domain.







## File and Directory Structure