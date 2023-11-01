# Example

Following is a simple example of Pax, compiled for Web, running in an iframe.  You can also [run this example](./start-creating-a-project.md) as a native macOS app or [watch a video](https://www.youtube.com/watch?v=xrN5nd9hjDw&t=2s) of the two apps running side-by-side.

<!-- TODO:  You can find more examples [in the GitHub repository.](https://www.github.com/pax-lang/examples/) -->

<iframe style="width: calc(100%); height: 450px; border: none;" src="https://static.pax.dev/jabberwocky/" ></iframe>

Try resizing your browser horizontally to see responsive resizing.  You can also try selecting text, clicking around until you find the animated click handler, and opening browser dev tools to inspect the HTML and CSS.  The text is readable by screen readers and web crawlers.

### Source code

```rust
//src/lib.rs
#[pax_app(
    <Stacker cells=10 >
        <Stacker cells=5 direction=Vertical >
            for i in 0..5 {
                <Rectangle fill={rgba((i * 20)%, 0, 100%, 100%)} />
            }
        </Stacker>

        for i in 0..8 {
            <Group>
                <Text id=index_text>"Index: {i}"</Text>
                <Rectangle fill={rgba(100%, (100 - (i * 12.5))%, (i * 12.5)%, 100%)} />
            </Group>
        }

        <Group @click=self.handle_click transform={Rotate(self.current_rotation)}>
            <Text>{JABBERWOCKY}</Text>
            <Rectangle fill=rgba(100%, 100%, 0, 100%) />
        </Group>
    </Stacker>

    @settings {
        ##index_text {
            x: 0%,
            y: { i * 12.5% },
            font: {
                family: "Real Text Pro",
                variant: "Demibold",
                size: {(20 + (i * 5))px},
            }
        }
    }
)]
pub struct Jabberwocky {
    pub num_clicks : Property<i64>,
    pub current_rotation: Property<f64>,
}

impl Jabberwocky {

    #[pax_on(WillRender)]
    pub async fn handle_pre_render(&mut self, ctx: NodeContext) {
        if args.frames_elapsed % 180 == 0 {
            //every 3s
            pax_lang::log(&format!("pax_lang::log from frame {}", args.frames_elapsed));
        }
    }

    pub async fn handle_click(&mut self, args: ArgsClick) {
        let new_rotation = self.current_rotation.get() + (2.0 * std::f64::consts::PI);
        self.current_rotation.ease_to(new_rotation, 120, EasingCurve::InOutBack );
        self.current_rotation.ease_to_later(0.0, 40, EasingCurve::OutBack );
    }
}

#[pax_const]
const JABBERWOCKY : &str = r#"’Twas brillig, and the slithy toves
Did gyre and gimble in the wabe:
All mimsy were the borogoves,
And the mome raths outgrabe.

“Beware the Jabberwock, my son!
The jaws that bite, the claws that catch!
Beware the Jubjub bird, and shun
The frumious Bandersnatch!”

He took his vorpal sword in hand;
Long time the manxome foe he sought—
So rested he by the Tumtum tree
And stood awhile in thought.

And, as in uffish thought he stood,
The Jabberwock, with eyes of flame,
Came whiffling through the tulgey wood,
And burbled as it came!

One, two! One, two! And through and through
The vorpal blade went snicker-snack!
He left it dead, and with its head
He went galumphing back.

“And hast thou slain the Jabberwock?
Come to my arms, my beamish boy!
O frabjous day! Callooh! Callay!”
He chortled in his joy.

’Twas brillig, and the slithy toves
Did gyre and gimble in the wabe:
All mimsy were the borogoves,
And the mome raths outgrabe.
"#;
```




<!-- Scrap: old examples:

### Clickable Square

```rust
use pax_lang::api::{Property, ClickArgs};

#pax[(
    <Rectangle id=square @click=self.handle_click />

    @settings {
        #square {
            width: 200px
            height: 200px
            transform: {Align(50%, 50%) * Anchor(50%, 50%) * Rotate(current_rotation)}
        }
    }
)]
pub struct ClickableSquare {
    current_rotation : Property<f64>
}

impl ClickableSquare {
  pub fn handle_click(&mut self, args: ArgsClick) {
    let old_current_rotation = self.current_rotation.get();

    //instead of an `ease_to` animation, could set value immediately with `self.theta.set(...)`
    self.current_rotation.ease_to(
      old_current_rotation + f64::PI() * 3.0, //new value
      240,                         //duration of transition, frames
      EasingCurve::OutBack,        //curve to use for interpolation 
    );
  }
}
```

### UI Forms
(speculative API)
```rust
//!! NOTE: UI form controls are not yet built; this API is speculative !!
use pax_std::forms::{TextBox, Button, ButtonPushArgs, CheckBox};
use pax_std::layouts::{Stacker, StackerDirection};
use pax_std::primitives::{Text};

use internal_http_submit; //imagined for brevity

#[pax(
    <Stacker direction=Vertical cells=4 >
    
        <Stacker direction=Horizontal cells=2>
            <Text>"First Name:"</Text>
            <TextBox bind=first_name />
        </Stacker>
    
        <Stacker direction=Horizontal cells=2>
            <Text>"Last Name:"</Text>
            <TextBox bind=last_name />
        </Stacker>
    
        <Stacker direction=Horizontal cells=2>
            <Text>"Age:"</Text>
            <TextBox bind=age format=numeric />
        </Stacker>
    
        <Button @push=self.handle_submit>"Submit"</Button>
    
    </Stacker>
)]
pub struct HelloForms {
    first_name: Property<String>,
    last_name: Property<String>,
    age: Property<i32>,
}

impl HelloForms {
    pub async fn handle_submit(&mut async_self: Channel<Self>, args: ButtonPushArgs) {
        internal_http_submit(
          async_self.first_name.get(),
          async_self.last_name.get(),
          async_self.age.get()
        ).await;
    }
}

```

More desired examples:
  - Modularity: creating, importing, and reusing a component — perhaps across crates
  - 





## Appendix D: Tic-tac-toe example

```
//Tic-tac-toe example
<Stacker direction=Horizontal cell_count=3 >
  for i in 0..3 {
    <Stacker direction=Vertical cell_count=3 >
      for j in 0..3 {
        <Group on_clap=handle_clap with (i, j)>
          if self.cells[i][j] == Cell::Empty {
            <image src="blank.png">
          }else if self.cells[i][j] == Cell:X {
            <Image src="x.png" />
          }else if self.cells[i][j] == Cell::O {
            <Image src="o.png" />
          }
        </Group>
      }
    </Stacker>
  }
</Stacker>
```




-->