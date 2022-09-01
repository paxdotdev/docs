# Event Handlers

**TODO: what "above example?"**

In the above example, `on_click=self.handle_click` binds a the `handle_click` method defined in the host codebase to the built-in `click` event which Pax fires when a user clicks the mouse on this element.  Events fire as "interrupts" and are allowed to execute arbitrary, side-effectful, imperative logic — anything you can write or use in Rust.

It is inside event handlers that you will normally change property values with the [properties API](/reference-)

Pax includes a number of built-in lifecycle events like `@will_render` and user interaction events like `@click` and `@tap`.  These can all be bound and handled in the same manner.

