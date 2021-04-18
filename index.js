const Benchmark = require('benchmark');
const { readdirSync } = require('fs');
const { join } = require('path');
// const execa = require('execa');

// const { stdout, stderr } = execa.commandSync('npm run build', { cwd: join(__dirname, '../') });
// if (stdout) {
//   console.log(stdout);
// }
// if (stderr) {
//   console.error(stderr);
// }

console.log('======== 性能测试开始 ========\n');

readdirSync(join(__dirname, 'test')).forEach((file) => {
  const tests = require(join(__dirname, 'test', file));
  const suite = new Benchmark.Suite({ minSamples: 100 });
  Object.keys(tests).forEach((key) => {
    suite.add(key, tests[key]);
  });
  suite
    .on('cycle', (e) => {
      console.log(String(e.target));
    })
    .on('complete', (e) => {
      console.log(`The fastest is ${e.currentTarget.filter('fastest').map('name')}\n`);
    })
    .run();
});

console.log('======== 性能测试结束 ========');
