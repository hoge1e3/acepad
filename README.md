
# Acepad

Mobile screen keyboard for [ace editor](https://ace.c9.io/).

This package provides screen keyboard that is customizable via HTML.

See also [acepad-dev](https://github.com/hoge1e3/acepad-dev), more practical environment with virtual file system on browser.

## Build

```
npm install
npm run build
```


## Demo

```
npm run demo
```

## Customize keyboard

Not documented yet. But `index.html` gives some idea.

## Notice

Ace editor and jQuery are needed to run `dist/index.js` but they are not contained to `dist/index.js`. 
These libralies should be loaded(and global variables `ace` and `$` are set) via `<script>` before `dist/index.js` is loaded.
