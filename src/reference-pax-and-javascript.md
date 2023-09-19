# Pax and JavaScript

Recall Pax's model as a "companion language" to Rust.  Pax definitions "snap on" to a host codebase, allowing that codebase to drive changes in state, respond to user input, perform side effects like network requests, and assemble reusable modules.

```rust
// Pax with a Rust host codebase
// src/hello-world.rs
use pax_lang::*;
use pax_lang::std::drawing2D::Rectangle;

#[pax(
    //On click, update theta and cause this Rectangle to rotate
    <Rectangle @click=self.handle_click transform={
        anchor(50%, 50%)   * 
        translate(50%, 50%)    * 
        rotate(self.theta) 
    } />
)]
pub struct HelloWorld {
    theta: Property<f64>,
}

impl HelloWorld {
    pub fn handle_click(&mut self, args: ArgsClick) {
        let old_theta = self.theta.get();
        
        //instead of an `ease_to` animation, could set value immediately with `self.theta.set(...)`
        self.theta.ease_to(
            old_theta + f64::PI() * 3.0, //new value
            240,                         //duration of transition, frames
            EasingCurve::OutBack,        //curve to use for interpolation 
        );
    }
}
```

In the future, Pax may also support JavaScript, Python, C++, or any number of other host languages.  With Pax TypeScript, the above example might look like:

```typescript
// Pax with TypeScript, speculative API
// !! TypeScript support has not yet been built !!
import {pax, EasingCurve} from '@pax-lang/pax';

@pax(`
    <Rectangle @click=this.handleClick transform={
        anchor(50%, 50%) *
        align(50%, 50%) *
        rotate(this.theta)
    } />
`)
class HelloWorld {
    @property
    theta: number;
    
    handleClick(args: ArgsClick) {
        const oldTheta = this.theta.get();
        
        //instead of an `easeTo` animation, could set value immediately with `self.theta.set(...)`
        this.theta.easeTo(
            oldTheta + Math.PI * 3.0,
            240,
            EasingCurve.OutBack
        );
    }
}

```