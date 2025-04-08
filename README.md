# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

> Lightweight performance testing tool supporting configuration files for defining and executing benchmark tests.

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

## Features
- Support for defining test tasks in JS/TS files
- Batch execution of multiple file tasks
- Automatic TypeScript compilation handling
- Benchmarking based on benchmark.js framework

## Usage

### 1. Define test tasks (task.js)
```javascript
export default {
  'test name': function() {
    // Test code implementation
  }
}
```

### 2. Run tests
```bash
npx tiret path/to/task.js
```

### 3. Batch execution
```bash
npx tiret tests/*.ts
```

## API Documentation

### `run(tasks, opts)`
Execute a single test group
- `tasks` (TaskGroup): Test task object
- `opts` (RunOptions): 
  - `before`: Pre-test callback
  - `done`: Post-test callback
  - `async`: Asynchronous execution flag

### `runFiles(input, opts)`
Execute test tasks from file patterns
- `input`: File path or glob pattern
- `opts`:
  - `cwd`: Working directory
  - `globOptions`: Glob options
  - All `run()` options supported

### TaskGroup Format
```typescript
type TaskGroup = Record<string, benchmark.BenchmarkFn>
```

## Configuration Examples
### task.ts (TypeScript)
```typescript
export default {
  'array push': () => {
    const arr = [];
    for (let i = 0; i < 1000; i++) {
      arr.push(i);
    }
  },
  
  'string concat': () => {
    let str = '';
    for (let i = 0; i < 1000; i++) {
      str += 'a';
    }
  }
}
```

## Output Example
```
string concat × 150,234 ops/sec ±1.83% (84 runs sampled)
array push × 69,800 ops/sec ±1.70% (89 runs sampled)
Fastest is string concat
```

## Development Standards
1. New features require unit tests
2. Maintain complete TypeScript type definitions
3. Follow ESM module standards

## Contribution Guide
1. Fork the repository
2. Create new branch: `git checkout -b feature/新增功能`
3. Commit code: `git commit -m 'feat: 新增功能描述'`
4. Create Pull Request
