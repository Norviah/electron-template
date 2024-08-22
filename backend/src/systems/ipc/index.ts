import { ipcMain } from 'electron';

export function initializeIpc(): void {
  ipcMain.handle('ping', async (event, args) => {
    return `pong from backend: ${args}`;
  });
}
