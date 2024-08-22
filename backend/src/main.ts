import { windowManager } from '@/systems/window';
import { app } from 'electron';

import { initializeIpc } from '@/systems/ipc';
import { initializeTray } from '@/systems/tray';

import '@/systems/window/structs/load';

import * as paths from '@/utils/paths';

const isProduction = app.isPackaged;

if (!isProduction) {
  require('electron-reload')(__dirname, { electron: paths.ELECTRON });
}

app.on('ready', async () => {
  initializeTray();
  initializeIpc();

  // // Open the app minimised in production
  // if (!app.isPackaged) {
  //   windowManager.main?.open();
  // }

  windowManager.main?.open();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
