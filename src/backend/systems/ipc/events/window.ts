import { BrowserWindow, type IpcMainEvent } from 'electron';

export function close(event: IpcMainEvent) {
  BrowserWindow.getFocusedWindow()?.close();
}

export function minimize(event: IpcMainEvent) {
  BrowserWindow.getFocusedWindow()?.minimize();
}

export function maximize(event: IpcMainEvent) {
  const window = BrowserWindow.getFocusedWindow();

  if (window?.isMaximized()) {
    window.unmaximize();
  } else {
    window?.maximize();
  }
}
