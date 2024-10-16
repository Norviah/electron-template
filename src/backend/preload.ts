import { contextBridge } from 'electron';
import { generateAPI } from './systems/ipc';

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', generateAPI());
} else {
  // @ts-ignore (defined in dts)
  window.api = generateAPI();
}
