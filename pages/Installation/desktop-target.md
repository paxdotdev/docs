# Desktop

Currently our only desktop target we support is macOS. We eventually plan to support all 3 major desktop platforms. 

## Build Pax applications as native macOS apps

- Building macOS apps requires running a Mac with macOS.  This is a constraint enforced technically and legally by Apple.
- Install xcode `>=15.0` and Xcode command line utils: `xcode-select --install`
- Make sure to accept Xcode's license agreement (prompted during Xcode startup for the first time)
- SDK Version `macosx13.3`, Xcode version `>=15.0`
- Current Minimum Deployment `13.0`
- Install all necessary build architectures for Rust, so that binaries can be built for both Intel and Apple Silicon macs
  ```
  rustup target add aarch64-apple-darwin x86_64-apple-darwin
  ```