#!/usr/bin/env node

const {Command} = require('commander');
const {green} = require('chalk');
const pkg = require('../package.json');
const run = require('../index');

const program = new Command();

program
  .version(pkg.version)
  .requiredOption('-i, --input <file...>', 'input files')
  .description(pkg.description);

program
  .addHelpText('after', green(`
Examples:
  $ tiret -i /path/index.test.js
  $ tiret -i /path/**/*.test.js`)
  )
  .parse(process.argv);

run(program.opts().input);
