import { createRequire } from 'node:module';
import { EOL } from 'node:os';

import benchmark from 'benchmark';
import { globby } from 'globby';

import { Options, Options2, TaskGroup } from './typings';

export * from './typings';

const require = createRequire(import.meta.url);

export async function run(tasks: TaskGroup, opts?: Options): Promise<string> {
  const suite = new benchmark.Suite();
  Object.entries(tasks).forEach(([name, task]) => {
    suite.add(name, task);
  });

  const messages: string[] = [];
  suite
    .on('cycle', (event) => {
      messages.push(String(event.target));
    });

  return new Promise((resolve, reject) => {
    suite
      .on('complete', function () {
        messages.push(`Fastest is ${this.filter('fastest').map('name')}`);
        resolve(messages.join(EOL));
      })
      .on('error', (evt) => {
        reject(evt);
      })
      .run(opts);
  });
}


export async function runFiles(input: string | string[], opts: Options2 = {}): Promise<void> {
  const files = await globby(input, { cwd: process.cwd(), absolute: true, ...opts.globby });

  const onRead = opts.onRead || (() => {});
  for (const file of files) {
    const tasks = file.endsWith('.mjs') ? (await import(file)).default : require(file);
    if (Array.isArray(tasks)) {
      for (const task of tasks) {
        onRead(await run(task, opts));
      }
    }
    else {
      onRead(await run(tasks, opts));
    }
  }
}
