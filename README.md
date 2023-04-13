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

### *.test.js

> example

```js
function max(a, b) {
  return a > b ? a : b;
}

const array = Array.from({ length: 1000 });
for (let i = 0; i < array.length; i++) {
  array[i] = Math.round(Math.random() * 10);
}

// 测试 max
module.exports = {
  '【Math.max】': function () {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      Math.max(array[i], array[i + 1]);
    }
  },

  '【max】': function () {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      max(array[i], array[i + 1]);
    }
  },
};

```
