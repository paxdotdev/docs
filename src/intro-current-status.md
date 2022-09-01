# Current Status

### Sept 1 2022
Pax is currently in _alpha preview._  It is not yet fully functional, but is now being developed in the open, in hopes that others may find Pax interesting and choose to help push it forward.  See [TODO.md]() on Github for the backlog thus far.

#### Run demo
As of this writing, you can run the Pax demo for macOS and Web on master, using the shell scripts `./run.sh` and `./run-web.sh`

#### Compiler finish-line
The most fundamental remaining work for Pax to become useful is to finish _automation of the compiler_.  That is: to write a Pax program today, you need to manually "unroll" that Pax code into RIL ("Rust Intermediate Language") and compile the resulting Rust program.  This is not particularly user-friendly: what would be the point of writing C if you had to manually unroll it into assembly before you could run a program?

The work for the compiler-finishline is nearly complete, and is happening on the now-substantial `compiler-finishline` branch on Github.  Once this is done — and you can write + automatically compile basic Pax programs — Pax can progress from `alpha preview` to `alpha`.

#### Async
A common use-case with Pax is expected to be: "load some data from server; update UI."  In the current alpha-preview state of Pax, the method that would "load something from server" would block the UI while awaiting a response.  In other words, if it took one second to receive a response from the server, the Pax UI would freeze for one second.  This is obviously not viable!

The solution is to support `async` event handlers in Pax, for example:

```rust
#[pax(/*...*/)]
pub struct MyStruct {
    pub app_data: Property<String>
}
impl MyStruct {
    //Note the `async` below!
    #[pax_on(DidMount)]
    pub async fn fetch_data(mut self) {
        //Proposed API:  for async functions, a "disposable" copy of the struct is passed by move from the Pax runtime. `my_crate::MyStruct::fetch_data(disposable_copy)`
        //`Property` is in charge of opaquely managing message-passing, such that by calling
        //`self.app_data.set("new value".to_string())` on this local, disposable `self`, a message is
        //sent to the canonical PropertyInstance to update its value.
    }
}
```

#### Cross-platform++
Further, significant work remains to run Pax on more screens.  To support a new platform (like Android,) a new `chassis` and `dev harness` must be built.  Thus far, two `(chassis, dev harness)` have been built:  see `pax-chassis-macos/` and `pax-chassis-web/`.

In order to support Linux, Windows, Android, and iOS, a `chassis` and `dev harness` will need to be written for each platform.  In good news, it's not a crazy amount of work — the bulk is in:
 1. writing a low-level bridge in a platform-native language (e.g. Swift on macOS) to accept the C structs that pass over the wire from the Pax engine, and
 2. interpreting these structs as messages, mapping into CRUD operations for native elements like text and form controls. (search for the method `processNativeMessageQueue` in `pax-chassis-macos` for an example.) In further good news, `pax-chassis-ios` will be able to share about 90% of the logic already written for `pax-chassis-macos`, so iOS support is close at hand.
 3. keeping each chassis updated over time with the addition of further native rendering elements, like form controls and drawing primitives

#### More primitives, form controls, and layout components
Pax's component library is just getting started, and to be a truly useful UI and graphics toolkit it requires a more thorough standard library.

Some of the high-priority upcoming pieces:

**Form controls:**
 - Dropdown list
 - Text input box
 - Checkbox
 - Radio button list
 - File upload
 
**Drawing primitives**
 - Path (bezier sequence)
 - Ellipse
 - Polygon

**Layouts & widgets**
 - Scroller (plus native scrolling hookups)
 - Drag & drop


#### Contribution

If you would like to help push Pax forward, either check out [TODO.md](), search the codebase for the characters `TODO:`, or jump on [Discord]() and strike up a conversation.