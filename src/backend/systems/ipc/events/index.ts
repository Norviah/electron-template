import type { IpcMainEvent } from 'electron';

export function ping(_event: IpcMainEvent, string: string) {
  console.log(`pong: ${string}`);
}

export * as window from './window';
