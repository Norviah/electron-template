import { BrowserWindow } from "electron";
import type { inferAsyncReturnType } from "@trpc/server";

export async function createContext() {
  const browserWindow = BrowserWindow.getFocusedWindow();

  return {
    window: browserWindow,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
