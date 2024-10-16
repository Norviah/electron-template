import type { generateAPI } from './systems/ipc';

declare global {
  interface Window {
    api: ReturnType<typeof generateAPI>;
  }
}
