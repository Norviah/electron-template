import type { IPCHandler } from '../../../../backend/preload';

// Extend the NodeJS namespace to ensure that environment variables are not
// accessible through the `process.env` object.
declare namespace NodeJS {
  interface ProcessEnv extends Record<string, never> {}
}

declare global {
  interface Window {
    ipc: IPCHandler;
  }
}
