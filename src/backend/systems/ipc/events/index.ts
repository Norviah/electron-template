import type { IpcMainEvent } from 'electron';

export function ping(event: IpcMainEvent, string: string) {
  console.log(`pong: ${string}`);
}

export * as window from './window';
