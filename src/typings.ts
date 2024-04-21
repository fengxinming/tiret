import { Options as GlobbyOptions } from 'globby';

export interface TaskEvent {
  type: string;
  timeStamp: number;
  currentTarget: any;
  target: any;
}

export interface TaskOptions {
  name: string;
  fn: () => any;
  onStart?: (e: TaskEvent) => void;
  onCycle?: (e: TaskEvent) => void;
  onAbort?: (e: TaskEvent) => void;
  onError?: (e: TaskEvent) => void;
  onReset?: (e: TaskEvent) => void;
  onComplete?: (e: TaskEvent) => void;
}

export type Task = () => any | TaskOptions;

export interface TaskGroup {
  [name: string]: Task;
}

export interface Options {
  async?: boolean;
  queued?: boolean;
}

export interface Options2 extends Options {
  globby?: GlobbyOptions;
  onRead?: (msg: string) => void;
}
