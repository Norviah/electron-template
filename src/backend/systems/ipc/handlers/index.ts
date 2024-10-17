import type { IpcMainInvokeEvent } from 'electron';

export function greet(_event: IpcMainInvokeEvent, name: string): string {
  return `Hello, ${name}!`;
}
