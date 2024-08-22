import { contextBridge, ipcRenderer } from 'electron';

const handler = {
  on: (channel: string, listener: (...args: any[]) => void) => {
    return ipcRenderer.on(channel, listener);
  },

  send: (channel: string, ...args: string[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
};

export type IPCHandler = typeof handler;

contextBridge.exposeInMainWorld('ipc', handler);
