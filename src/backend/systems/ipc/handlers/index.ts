import type { IpcMainInvokeEvent } from 'electron';

export function greet(event: IpcMainInvokeEvent, name: string): string {
  return `Hello, ${name}!`;
}
