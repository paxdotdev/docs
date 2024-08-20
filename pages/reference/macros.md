# Pax Macros & Configuration

**Rust:**

Annotate a struct with the `#[pax]` macro to register it for parsing & pax Property creation. 

## The macro

 - `#[pax]`
Declares a Pax component definition

 - `#[main]`
Specifies the root component of the application; necessary to enable running your root component as a Pax app (as opposed to exporting as a library, in which case a `#[main]` is not required.)

Example:
```
#[pax]
#[main]
pub struct MyApp {
    some_property: Property<usize>
}
```


## Specifying the Pax definition

 - `#[file(FILENAME)]` 
Declares a Pax component definition by pointing to a separate `.pax` file instead of requiring an inline declaration

Example:
```
#[pax]
#[file("path-to-pax.pax")]
pub struct Foo {}
```

 - `#[inlined(PAX_TEMPLATE)]` 
Declares a Pax component definition inline in a rust file

Example:
```
#[pax]
#[inlined(<Group><Rectangle /></Group>)]
pub struct Foo {}
```


## Overriding auto-generated logic

Certain traits and other logic are derived automatically on #[pax] macros, including `Default` and `Clone`.  To suppress this behavior, use the `#[custom(...)]` attribute.  For example:

```
#[pax]
#[custom(Default)]
pub struct SomeComponent {
    some_property: Property<usize>,
    some_other_property: Property<f64>,
}

impl Default for SomeComponent {
    fn default() -> Self {
        Self {
            some_property: Property::new(16),
            some_other_property: Property::new(64.0),
        }
    }
}
```

Supported `#[custom()]` symbols include: `Clone`, `Default`, `Serialize`, `Deserialize`, `Debug` and `Interpolatable`
