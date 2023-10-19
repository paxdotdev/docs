# Introduction to Pax

Pax is a user interface language and 2D layout engine.  Use Pax to develop cross-platform apps with Rust.

Pax compiles through Rust into native Mac apps (LLVM) or Web apps (WebAssembly). Support for more platforms is planned, at least: Linux, Windows, iOS, and Android.

## Example

Writing Pax is intended to feel familiar, and the language borrows many ideas from [prior art](./intro-goals-prior-art.md#prior-art--inspiration).

Following is a simple Pax component called `IncrementMe`:

```rust
//File: lib.rs
use pax_lang::*;
use pax_lang::api::*;
use pax_std::primitives::*;
use pax_std::types::*;
use pax_std::types::text::*;
use pax_std::components::Stacker;

/// Defines the Pax component `IncrementMe`, with template & settings specified in `increment-me.pax`.
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
        self.message.set("Click here".to_string());
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
The above `IncrementMe` component could be mounted as its own app, or could be composed into other Pax components.

This book will give a brief introduction to Pax: its goals, how to use it, and details of is design and implementation.
