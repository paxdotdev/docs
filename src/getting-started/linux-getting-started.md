# Linux (Debian / Ubuntu) workstation

- Get rust (if already installed, ensure rustc version 1.73.0 or higher):

  `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

- Download required packages:

  `apt update && apt install pkg-config libglib2.0-dev libssl-dev libpango1.0-dev`

- Install the Pax CLI: 

  `cargo install pax-cli`

- Web build requires wasm-pack: 

  `cargo install wasm-pack`

- Create a new project:

  `pax-cli new my-first-project`

- Run: 

  `cd my-first-project && pax-cli run --target=web`

&nbsp;


NOTE: `cargo install pax-cli` and first run of `pax-cli run` take some time.
