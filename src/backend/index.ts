import icon from '../../resources/icon.png';

import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { join } from 'node:path';
import { settings } from './lib/settings';
import { debounce, registerHandlers, registerIPC } from './lib/utils';

import * as api from './systems/ipc';

const { width, height } = settings.get('dimensions');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width,
    height,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false,
    },
    minHeight: 670,
    minWidth: 900,
    frame: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  function saveWindowDimensions() {
    const [width, height] = mainWindow.getSize();
    settings.set('dimensions', { width, height });
  }

  mainWindow.on('resize', debounce(saveWindowDimensions, 500));

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  registerIPC(ipcMain, api.events);
  registerHandlers(ipcMain, api.handlers);

  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
