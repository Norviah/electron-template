import type * as api from './systems/ipc';
import type { API } from './types/ipc';

declare global {
  interface Window {
    api: API<(typeof api)['events']>;
  }
}
