# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

> Note: benchmark runner.

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

## Usage

### Globally using

```bash
$ npm i tiret -g
$ tiret ./test/*.test.js
```

### API

```js
import { runFiles } from 'tiret';
runFiles('./test/*.test.mjs', {
  async: true,
  done(msg) {
    console.info(msg);
  }
});
```


```js
import { run } from 'tiret';
function min(a, b) {
  return a < b ? a : b;
}

const array = Array.from({ length: 1000 });
for (let i = 0; i < array.length; i++) {
  array[i] = Math.round(Math.random() * 10);
}

run({
  '【Math.min】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      Math.min(array[i], array[i + 1]);
    }
  },

  '【min】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      min(array[i], array[i + 1]);
    }
  }
});
```

### *.test.mjs

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
export default {
  '【Math.max】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      Math.max(array[i], array[i + 1]);
    }
  },

  '【max】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      max(array[i], array[i + 1]);
    }
  }
};
```
