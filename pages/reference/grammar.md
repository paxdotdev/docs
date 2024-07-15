# Grammar

The Pax language comprises three grammars:
 1. [Template grammar](https://github.com/paxengine/pax/blob/master/pax-lang/src/pax.pest#L08)
 2. [Settings grammar](https://github.com/paxengine/pax/blob/master/pax-lang/src/pax.pest#L75)
 3. [Expressions grammar](https://github.com/paxengine/pax/blob/master/pax-lang/src/pax.pest#L169)

Each grammar serves a specific function:
 - `templates` declare content & dynamic branching (`if`,`for`)
 - `settings` assign values to properties, optionally with CSS-like syntax
 - `expressions` allows binding properties to spreadsheet-like functions of state

Pax's parser is powered by a Parsing Expression Grammar (PEG), using [Pest](https://pest.rs/)

Rather than maintaining a separate rendition of the grammar here in the docs, refer to the [grammar in the source code](https://github.com/paxengine/pax/blob/master/pax-lang/src/pax.pest).