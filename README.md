# tiret

> benchmark runner

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
export default function run(input: string | string[]): void
```
