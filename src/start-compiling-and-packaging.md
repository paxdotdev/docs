# Compiling & Packaging

Once you have written a Pax program, you may want to package it for distribution to users beyond yourself.

The Pax compiler ([source code](https://www.github.com/pax-lang/pax-lang/src/pax-compiler/)) is responsible for the heavy lifting, both for developing Pax projects (`pax run`) and compiling for distribution (`pax build`)

In short: to build a Pax project for a given platform, use:

```bash
pax build --target=macos --out=my_app.app
```

where `macos` is one of the supported platforms:

 - macos
 - web
 - TODO: android
 - TODO: ios
 - TODO: windows
 - TODO: linux (various)


For further reading about the internals of the compiler, see: [Pax's compilation model](/reference-compilation-model)