# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

> Note: benchmark runner.

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

## Usage

### Globally using

```bash
$ npm i tiret -g
$ tiret -i ./test/*.test.js
```

### API

```js
const run = require('tiret');
run('./test/*.test.js');
```

```ts
export default function(input: string | string[]): void
```
