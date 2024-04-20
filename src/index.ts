import { createRequire } from 'node:module';
import { EOL } from 'node:os';

import benchmark from 'benchmark';
import { globby } from 'globby';

import { spinner } from './spinner';

const require = createRequire(import.meta.url);

function print(msg) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

async function runTask(file: string): Promise<string> {
  const tests = file.endsWith('.mjs') ? (await import(file)).default : require(file);
  const suite = new benchmark.Suite();
  Object.entries(tests).forEach(([name, task]) => {
    suite.add(name, task);
  });

  const messages: string[] = [];
  return new Promise((resolve, reject) => {
    suite
      .on('cycle', (event) => {
        messages.push(String(event.target));
      })
      .on('complete', function () {
        messages.push(`Fastest is ${this.filter('fastest').map('name')}`);
        resolve(messages.join(EOL));
      })
      .on('error', (evt) => {
        reject(evt);
      })
      .run({ async: true });
  });
}

async function run(input: string | string[]) {
  const start = Date.now();

  const files = await globby(input, { cwd: process.cwd(), absolute: true });

  for (const file of files) {
    spinner.start(`Test ${file}`);
    const msg = await runTask(file);
    spinner.stop(false);
    print(msg);
    print('');
  }

  spinner.done(`Done in ${Date.now() - start} ms.`);
}

export default run;
