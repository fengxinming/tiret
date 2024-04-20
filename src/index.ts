import { createRequire } from 'node:module';

import benchmark from 'benchmark';
import { globby } from 'globby';

const require = createRequire(import.meta.url);

function print(msg) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

async function run(input: string | string[]) {
  print('======== Benchmark start ========\n');

  const files = await globby(input, { cwd: process.cwd(), absolute: true });

  for (const file of files) {
    const tests = file.endsWith('.mjs') ? (await import(file)).default : require(file);
    const suite = new benchmark.Suite();
    Object.entries(tests).forEach(([name, task]) => {
      suite.add(name, task);
    });
    suite
      .on('cycle', (event) => {
        print(String(event.target));
      })
      .on('complete', function () {
        print(`Fastest is ${this.filter('fastest').map('name')}`);
      })
      .run();
  }

  print('\n======== Benchmark end ========');

}

export default run;
