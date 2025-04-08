import { readFileSync } from 'node:fs';
import { unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { EOL } from 'node:os';
import { join, parse } from 'node:path';

import benchmark from 'benchmark';
import { glob } from 'tinyglobby';
import { transformWithEsbuild } from 'vite';

import { RunFilesOptions, RunOptions, TaskGroup } from './typings';

export * from './typings';

const __require = createRequire(import.meta.url);

function noop(): any {}

export async function run(tasks: TaskGroup, opts: RunOptions = {}): Promise<string> {
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

async function getTask(filename: string): Promise<TaskGroup | TaskGroup[] | undefined> {
  // eslint-disable-next-line prefer-const
  let { ext, dir, name } = parse(filename);
  const isTs = ext === '.ts' || ext === '.mts';
  if (isTs) {
    const { code } = await transformWithEsbuild(readFileSync(filename, 'utf-8'), filename, {
      loader: 'ts',
      target: 'esnext'
    });
    filename = join(dir, `${name}-${Math.random().toString(36).slice(2)}.mjs`);
    ext = '.mjs';
    await writeFile(filename, code);
  }

  let config: TaskGroup | TaskGroup[] | undefined;
  switch (ext) {
    case '.js':
      config = __require(filename);
      break;
    case '.mjs':
      config = (await import(filename)).default;
      if (isTs) {
        await unlink(filename);
      }
      break;
  }
  return config;
}

export async function runFiles(input: string | string[], opts: RunFilesOptions = {}): Promise<void> {
  const { cwd, glob: globOptions, ...runOpts } = opts;
  const files = await glob(input, Object.assign({ cwd: cwd || process.cwd(), absolute: true, globOptions }));

  for (const file of files) {
    const tasks = await getTask(file);
    if (Array.isArray(tasks)) {
      for (const task of tasks) {
        await run(task, runOpts);
      }
    }
    else if (tasks) {
      await run(tasks, runOpts);
    }
  }
}
