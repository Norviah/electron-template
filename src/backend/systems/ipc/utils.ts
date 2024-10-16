import { type IpcMain, type IpcMainEvent, type IpcMainInvokeEvent, ipcRenderer } from 'electron';

import * as events from './events';
import * as handlers from './handlers';

import type { API, EventTypes, IPCCollection } from './types';

function _registerAPI<T extends IPCCollection<IpcMainEvent> | IPCCollection<IpcMainInvokeEvent>>(
  ipc: IpcMain,
  collection: T,
  method: EventTypes<T>[0],
): void {
  for (const key in collection) {
    if (typeof collection[key] === 'function') {
      // @ts-ignore
      ipc[method](key, collection[key]);
    } else {
      _registerAPI(ipc, collection[key], method);
    }
  }
}

function _generateAPI<T extends IPCCollection<IpcMainEvent> | IPCCollection<IpcMainInvokeEvent>>(
  collection: T,
  type: EventTypes<T>[1],
): T extends IPCCollection<any> ? API<T> : never {
  const api: Record<string, unknown> = {};

  for (const key in collection) {
    const value = collection[key];

    if (typeof value === 'function') {
      api[key] = (...args: unknown[]) => ipcRenderer[type](key, ...args);
    } else {
      api[key] = _generateAPI(value, type);
    }
  }

  return api as T extends IPCCollection<any> ? API<T> : never;
}

/**
 * Registers the API to the IPC system.
 *
 * This function imports the `events` and `handlers` modules and registers the
 * respective functions to the IPC main object.
 *
 * @param ipc The IPC main object.
 */
export function registerAPI(ipc: IpcMain): void {
  _registerAPI(ipc, events, 'on');
  _registerAPI(ipc, handlers, 'handle');
}

/**
 * Generates the API for the IPC system.
 *
 * For security reasons, we shouldn't expose the entire IPC system to the
 * renderer process, instead, we should only expose the necessary methods which
 * calls `ipcRenderer.send` or `ipcRenderer.invoke` to communicate with the main
 * process.
 *
 * This function generates the API object that will be exposed to the renderer
 * process that calls the respective `ipcRenderer` method, which is inferred
 * from the declared functions within the `events` and `handlers` modules.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/ipc
 * @returns The generated API object.
 */
export function generateAPI(): API<typeof events> & API<typeof handlers> {
  return { ..._generateAPI(events, 'send'), ..._generateAPI(handlers, 'invoke') };
}
