# Windows workstation

- Get [rust](https://www.rust-lang.org/learn/get-started) (if already installed, ensure rustc version 1.73.0 or higher):

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
