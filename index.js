const Benchmark = require('benchmark');
const {join, isAbsolute} = require('path');
const globby = require('globby');

function run(input) {
  console.log('======== Benchmark start ========\n');

  const cwd = process.cwd();
  const files = globby.sync(input);
  for (let file of files) {
    if (!isAbsolute(file)) {
      file = join(cwd, file);
    }
    const tests = require(file);
    const suite = new Benchmark.Suite({minSamples: 100});
    Object.keys(tests).forEach(key => {
      suite.add(key, tests[key]);
    });
    suite
      .on('cycle', e => {
        console.log(String(e.target));
      })
      .on('complete', e => {
        console.log(`The fastest is ${e.currentTarget.filter('fastest').map('name')}\n`);
      })
      .run();
  }

  console.log('======== Benchmark end ========');

}

module.exports = run;
