# Pax Macros

Rust macros are the way that information gets exposed from Rust to Pax.

 - `pax`
Declares a Pax component definition, specifically a _non-root_ component that may be imported and instantiated in other components' templates.

 - `pax_app`
Declares a Pax component definition, specifically a _root_ component, mounted as the entry-point to a given program

 - `pax_file` (Sept '22: not yet implemented)
Declares a Pax component definition by pointing to a separate `.pax` file instead of requiring an inline declaration

 - `pax_const` (Sept '22: not yet implemented)
Allows Pax expressions to refer to a given `const` by symbol

 - `pax_on`
Used to bind component methods to events, such as lifecycle events `#[pax_on(DidMount)]`

 - `pax_type`
Used to tell Pax that you want a type to be parsed by Pax, for example to use `Property<T>` within nested structs.  `pax-std` uses `pax_type` to expose `Font`, `Stroke`, and `Color`, for example

 - `pax_primitive`
Declares that a struct and its properties should be treated by the Pax engine as a `primitive` — [read more about primitives.](./start-key-concepts-primitives.md)

