# Grammar

The Pax language comprises three grammars:
 1. [Templates](/TODO/pax.pest#L00)
 2. [Settings](/TODO/pax.pest#L00)
 3. [Expressions](/TODO/pax.pest#L00)

Each grammar serves a specific function:
 - `templates` declare content
 - `settings` assign values to properties, optionally with CSS-like syntax
 - `expressions` allows binding properties to "spreadsheet-like" functions

Pax's parser is written using a Parsing Expression Grammar (PEG), specifically using the excellent tool [Pest](https://pest.rs/)

Rather than maintain a separate rendition of the grammar here in the docs, refer to the [definition in the source code](TODO/pax.pest).