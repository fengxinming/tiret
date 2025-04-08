import { readFileSync } from 'node:fs';
import { unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, parse } from 'node:path';

import { transformWithEsbuild } from 'vite';

import { TaskGroup } from './typings';

export * from './typings';

const __require = createRequire(import.meta.url);

export async function getTask(filename: string): Promise<TaskGroup | TaskGroup[] | undefined> {
  // eslint-disable-next-line prefer-const
  let { ext, dir, name } = parse(filename);
  const isTs = ext === '.ts' || ext === '.mts';
  if (isTs) {
    const { code } = await transformWithEsbuild(readFileSync(filename, 'utf-8'), filename, {
      loader: 'ts',
      target: 'esnext'
    });
    filename = join(dir, `${name}-${Math.random().toString(36).slice(2)}.mjs`);
    ext = '.mjs';
    await writeFile(filename, code);
  }

  let config: TaskGroup | TaskGroup[] | undefined;
  switch (ext) {
    case '.js':
      config = __require(filename);
      break;
    case '.mjs':
      config = (await import(filename)).default;
      if (isTs) {
        await unlink(filename);
      }
      break;
  }
  return config;
}
