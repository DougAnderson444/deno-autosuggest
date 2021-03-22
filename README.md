# LucidSuggest Quickstart

Autocomplete engine that works out of the box. Fast, simple, built with Rust.

Check out [live demo](http://lucid-search.io.s3-website.eu-central-1.amazonaws.com/demo/index.html).

Read [JavaScript docs](http://github.com/thaumant/lucid-suggest/blob/master/javascript/README.md).

# Dev & Build from source

```sh
cd javascript
npm install
make
```

ensure rustup is [installed](https://rustup.rs/)

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup show

```

ensure wasm-pack is [installed](https://rustwasm.github.io/wasm-pack/installer/):

```
wasm-pack -V
```

The makefile uses rollup, so to execute rollup it's handy to have nodejs installed so you can do:

```
npx rollup ....
```

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
````

Install then run `make` to run the `./javascript/Makefile` in linux