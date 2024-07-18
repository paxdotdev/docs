# Pax Macros

Rust macros are the way that information gets exposed from Rust to Pax.

 - `#[pax]`
Declares a Pax component definition, specifically a _non-root_ component that may be imported and instantiated in other components' templates.

 - `#[main]`
Specifies the root component of the application

 - `#[file(FILENAME)]` 
Declares a Pax component definition by pointing to a separate `.pax` file instead of requiring an inline declaration

 - `#[inlined(PAX_TEMPLATE)]` 
Declares a Pax component definition inline in a rust file

 - `#[custom(Default)]` 
Optional. Only needed if you want to implement Default for the struct yourself.