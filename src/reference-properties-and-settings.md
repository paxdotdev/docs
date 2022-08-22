# Properties & Settings

Properties and Settings are two sides of the same idea, so they share an explanatory chapter, even though they are rather different to use in practice.

## Properties

Properties are defined on structs...
    Attach macro
    wrap in `Property<T>`
    get/set
    ease, animations

Properties act as "inputs" — they say, "these are the properties that can be _set_ on this component — via _settings_."

For example, a property `num_clams : u16` can be set with the inline setting `<ClamVisualizer num_clams=5 />` or the setting block `#clam_viz_id { num_clams: 65535 }`.  Read further for more detail on the difference between "inline settings" and "settings blocks."


## Settings 

Settings can be expressed with two different syntaxes: `inline settings` or `settings block`.  Each syntax has access to the exact same properties and each syntax can be an entry-point for expressions (`{...}`)

When both an inline setting and a setting block define settings for the same property, the inline setting takes precedence, inspired by HTML and CSS.

### Inline Settings

Inline settings are authored _inline_ into a template definition.  You might recognize this syntax as nearly identical to _XML attributes_.  Example:

```pax
//inside a template definition
<SomeComponent some_property="SomeSetting" />
```

Unlike XML, Pax's inline settings syntax supports values beyond string literals, such as enums, symbolic identifiers, and numeric literals.  Pax inline settings may also be bound to expressions, wrapped in `{}`, such as:
```pax
//`self.current_width` refers to a property from the attached Rust struct, not shown here.
<Rectangle width={self.current_width} height={self.current_width * 1.5} />
```


###


TODO: Settings are defined in Pax, inlined with template or elements or inside a `@settings` block.

TODO: Defaults can be set for a component by declaring a `@default{}` block, including a list of Pax settings.