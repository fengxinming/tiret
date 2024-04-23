import { createRequire } from 'node:module';
import { EOL } from 'node:os';

import benchmark from 'benchmark';
import { globby } from 'globby';

import { Options, Options2, TaskGroup } from './typings';

export * from './typings';

const require = createRequire(import.meta.url);

function noop(): any {}

export async function run(tasks: TaskGroup, opts: Options = {}): Promise<string> {
  const { before = noop, done = noop } = opts;

  const suite = new benchmark.Suite();
  Object.entries(tasks).forEach(([name, task]) => {
    suite.add(name, task);
  });

  return new Promise((resolve, reject) => {
    let msg = '';
    suite
      .on('cycle', (event) => {
        msg += String(event.target) + EOL;
      })
      .on('complete', function () {
        msg += `Fastest is ${this.filter('fastest').map('name')}${EOL}`;
        done(msg);
        resolve(msg);
      })
      .on('error', (evt) => {
        reject(evt);
      });
    before();
    suite.run(opts);
  });
}


export async function runFiles(input: string | string[], opts: Options2 = {}): Promise<void> {
  const { cwd, globby: globbyOptions, ...runOpts } = opts;
  const files = await globby(input, { cwd: cwd || process.cwd(), absolute: true, ...opts.globby });

  for (const file of files) {
    const tasks = file.endsWith('.mjs') ? (await import(file)).default : require(file);
    if (Array.isArray(tasks)) {
      for (const task of tasks) {
        await run(task, runOpts);
      }
    }
    else {
      await run(tasks, runOpts);
    }
  }
}
