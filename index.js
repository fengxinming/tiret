const Benchmark = require('benchmark');
const { join, isAbsolute } = require('path');
const globby = require('globby');

function print(msg) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

function run(input) {
  print('======== Benchmark start ========\n');

  const cwd = process.cwd();
  const files = globby.sync(input);
  for (let file of files) {
    if (!isAbsolute(file)) {
      file = join(cwd, file);
    }
    const tests = require(file);
    const suite = new Benchmark.Suite({ minSamples: 100 });
    Object.keys(tests).forEach((key) => {
      suite.add(key, tests[key]);
    });
    suite
      .on('cycle', (e) => {
        print(String(e.target));
      })
      .on('complete', (e) => {
        print(`The fastest is ${e.currentTarget.filter('fastest').map('name')}\n`);
      })
      .run();
  }

  print('======== Benchmark end ========');

}

module.exports = run;
