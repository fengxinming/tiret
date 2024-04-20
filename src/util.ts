import {
  readFileSync
} from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const rootPath = join(__dirname, '..');

/**
 * 读取文件
 */
export function readFile(pth: string, cwd?: string): string {
  if (!cwd) {
    cwd = rootPath;
  }
  if (!isAbsolute(pth)) {
    pth = join(cwd, pth);
  }
  return readFileSync(pth, 'utf-8');
}

/**
 * 读取json文件
 */
export function readJsonFile(relativePath: string, cwd?: string): Record<string, any> {
  return JSON.parse(readFile(relativePath, cwd));
}

export const rootPkg = readJsonFile('package.json');
