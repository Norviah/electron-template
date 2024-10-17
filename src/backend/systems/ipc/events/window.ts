import { BrowserWindow, type IpcMainEvent } from 'electron';

export function close(_event: IpcMainEvent) {
  BrowserWindow.getFocusedWindow()?.close();
}

export function minimize(_event: IpcMainEvent) {
  BrowserWindow.getFocusedWindow()?.minimize();
}

export function maximize(_event: IpcMainEvent) {
  const window = BrowserWindow.getFocusedWindow();

  if (window?.isMaximized()) {
    window.unmaximize();
  } else {
    window?.maximize();
  }
}
