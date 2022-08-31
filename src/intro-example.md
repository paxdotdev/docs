# Example


This example of Pax covers the basic concepts, suitable for a first look.  You can find more examples [in the GitHub repository.](https://www.github.com/pax-lang/examples/)

For more detail on the various pieces of Pax, see: [Anatomy of a Pax Program](/start-anatomy-of-a-pax-program.html)

### Clickable square
_Clickable square_ centers a square in the viewport and animates its rotation when clicked.  It includes:
  - A [template]() definition
  - A click [event binding]() and Rust handler
  - An [expression]() bound to the Rectangle's [transform](/reference-coordinates-and-transforms.html) property (`{...}`)

```rust
use pax::api::{Property, ArgsClick, Transform2D};

#[pax(
    <Rectangle id=square @click=self.handle_click width=200px height=200px transform={
        Transform2D::Align(50%, 50%)  *         //Align relative to parent container
        Transform2D::Anchor(50%, 50%) *         //Origin of transformation, relative to element bounds
        Transform2D::Rotate(current_rotation)   
    } />
)]
pub struct ClickableSquare {
    current_rotation : Property<f64>
}

impl ClickableSquare {
    pub fn handle_click(&mut self, args: ArgsClick) {
        let old_current_rotation = self.current_rotation.get();

        //instead of an `ease_to` animation, could set value immediately with `self.theta.set(...)`
        self.current_rotation.ease_to(
            old_current_rotation + f64::PI() * 3.0,  //new value
            240,                                     //duration of transition, frames
            EasingCurve::OutBack,                    //curve to use for interpolation 
        );
    }
}
```

TODO: embed running program in resizable iframe