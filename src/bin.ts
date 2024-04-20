#!/usr/bin/env node

import cac, { CAC } from 'cac';
import figlet from 'figlet';

import run from './index';
import { rootPkg } from './util';

function banner(msg, opts) {
  console.info('');
  try {
    console.info(figlet.textSync(msg, opts));
  }
  catch (e) {
    console.info(msg);
  }
  console.info('');
}


function start(cli: CAC) {
  cli
    .command('<...files>', 'benchmark runner')
    .example((name) => {
      return `
      $ ${name} /path/index.test.js
      $ ${name} /path/**/*.test.js
`;
    })
    .action((files) => {
      run(files);
    });
}

// 大标题
banner(rootPkg.name, {
  font: 'ANSI Shadow'
});

// 创建命令终端
const cli = cac();

start(cli);

cli.version(rootPkg.version).help();

cli.parse(process.argv);

