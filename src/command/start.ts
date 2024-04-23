import { createRequire } from 'node:module';

import { CAC } from 'cac';
import { globby } from 'globby';

import { run } from '../index';
import { spinner } from '../spinner';

const require = createRequire(import.meta.url);

function print(msg) {
  // eslint-disable-next-line no-console
  console.log(msg);
}
export default function start(cli: CAC) {
  cli
    .command('<...files>', 'benchmark runner')
    .example((name) => {
      return `
      $ ${name} /path/index.test.js
      $ ${name} /path/**/*.test.js
`;
    })
    .action(async (input: string[]) => {
      const start = Date.now();

      const cwd = process.cwd();
      const files = await globby(input, { cwd, absolute: true });

      for (const file of files) {
        const tasks = file.endsWith('.mjs') ? (await import(file)).default : require(file);
        if (Array.isArray(tasks)) {
          print(`Benchmark ${file}`);
          for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            spinner.start(`Suite ${i + 1}`);
            const msg = await run(task, { async: true });
            spinner.done();
            print(msg);
            print('');
          }
        }
        else {
          spinner.start(`Benchmark ${file}`);
          const msg = await run(tasks, { async: true });
          spinner.done();
          print(msg);
          print('');
        }
      }

      spinner.done(`Done in ${Date.now() - start} ms.`);
    });
}
