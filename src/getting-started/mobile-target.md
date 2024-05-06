# Mobile

Currently the main mobile target we support is iOS.

## Build Pax applications as native iOS apps
- Follow instructions for building native macOS apps, above
- Install all necessary build architectures for Rust, so that binaries can be built for iOS and simulator targets:
  ```
  rustup target add aarch64-apple-ios x86_64-apple-ios aarch64-apple-ios-sim
  ```
- Install [ios simulator through Xcode](https://developer.apple.com/documentation/safari-developer-tools/adding-additional-simulators)

