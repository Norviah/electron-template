import { contextBridge } from "electron";
import { generateAPI } from "./lib/utils";

import * as api from "./systems/ipc";

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("api", generateAPI(api.events));
} else {
  // @ts-ignore (defined in dts)
  window.api = generateAPI(api.events);
}
