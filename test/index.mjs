import { runFiles } from '../dist/index.mjs';

runFiles('./test/*.test.mjs', {
  async: true,
  done(msg) {
    console.info(msg);
  }
});
