# Pax and JavaScript

We are working on Pax JavaScript — this will allow Pax to be built with JavaScript/TypeScript as an alternative to Rust.

For native builds, we intend Pax JavaScript to work similarly to React Native — app binaries will include a headless browser runtime to interpret JavaScript alongside Pax's machine-code core.

Pax Engine will remain built in Rust, as will the standard library (pax-std) — Pax JavaScript will simply offer another choice of programming language for
building Pax apps.

