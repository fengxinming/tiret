import cac from 'cac';
import figlet from 'figlet';

import { rootPkg } from '../util';
import start from './start';

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

// 大标题
banner(rootPkg.name, {
  font: 'ANSI Shadow'
});

// 创建命令终端
const cli = cac();

start(cli);

cli.version(rootPkg.version).help();

cli.parse(process.argv);

