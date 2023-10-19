# Components

The atomic unit of Pax is a `component definition`. A component definition for `MyNewComponent` may look like:

```rust
// src/lib.rs
use pax_lang::*;
use pax_lang::api::*;
use pax_std::primitives::*;
use pax_std::types::*;
use pax_std::types::text::*;
use pax_std::components::Stacker;

#[derive(Pax)]
#[main]
#[file("increment-me.pax")]
pub struct IncrementMe {
    pub num_clicks: Property<u32>,
    pub message: Property<String>,
}

impl IncrementMe {
    pub fn handle_did_mount(&mut self, ctx: RuntimeContext) {
        self.num_clicks.set(0);
        self.message.set("0 clicks".to_string());
    }
    pub fn increment(&mut self, ctx: RuntimeContext, args: ArgsClick){
        let old_num_clicks = self.num_clicks.get();
        self.num_clicks.set(old_num_clicks + 1);
        self.message.set(format!("{} clicks", self.num_clicks.get()));
    }
} 
```
```rust
//increment-me.pax
<Text text={self.message} class=centered class=small id=text />
<Rectangle class=centered class=small @click=self.increment
    fill={Fill::Solid(Color::rgba(0.0,0.0,0.0,1.0))} 
    corner_radii={RectangleCornerRadii::radii(10.0,10.0,10.0,10.0)}
/>

@handlers{
     did_mount:handle_did_mount
}

@settings {
     .centered {
        x: 50%
        y: 50%
        anchor_x: 50%
        anchor_y: 50%
    } 
    .small {
        width: 120px
        height: 120px
    }
    #text {
        style: {
                font: {Font::system("Times New Roman", FontStyle::Normal, FontWeight::Bold)},
                font_size: 32px,
                fill: {Color::rgba(1.0, 1.0, 1.0, 1.0)},
                align_vertical: TextAlignVertical::Center,
                align_horizontal: TextAlignHorizontal::Center,
                align_multiline: TextAlignHorizontal::Center
        }
    }
}
```


You can think of the component definition as a package for a number of different interconnected pieces, or perhaps a cell with a number of different organelles.  


Inside a component definition, there may be:

 - A [Template](./start-key-concepts-templates.md)
 - [Settings](./start-key-concepts-properties-settings.md) and [Expressions](./start-key-concepts-expressions.md)
 - [Property Definitions](./start-key-concepts-properties-settings.md)
 - [Event Handlers](./start-key-concepts-event-handlers.md)

A component definition centers around a _Rust struct_, to which a piece of Pax is attached to through the macro `derive(Pax)`. Pax can either be attached inline using the `inlined()` attribute or link to a `.pax` file using the `file()` attribute using a relative path. For example, the following defines an empty component called `EmptyComponent`:

```rust
use pax_lang::api::*;
use pax_std::primitives::Group;

#[derive(Pax)]
#[inlined(<Group />)] //a one-element template, simply an empty Group
pub struct EmptyComponent {
    //no properties
}
```

Any component created in Pax can be used inside other components — for example, `EmptyComponent` can be imported and used in another component's template like:

```rust
use pax_lang::api::*;
use crate::EmptyComponent;

#[derive(Pax)]
#[inlined(<EmptyComponent />)] //another one-element template, ultimately still not rendering anything
pub struct StillEmptyComponent {
    //no properties
}
```

This "components all the way down" pattern may be familiar if you have used a GUI framework like React or Vue. 

This is essentially how you define a Pax Component. The only exception is the root component which is signified with the `main` attribute and lives in the root `lib.rs`.

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
