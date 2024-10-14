import type { inferAsyncReturnType } from '@trpc/server';
import { BrowserWindow } from 'electron';

export async function createContext() {
  const browserWindow = BrowserWindow.getFocusedWindow();

  return {
    window: browserWindow,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
