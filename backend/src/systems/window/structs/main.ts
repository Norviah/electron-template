import { BrowserWindow } from 'electron';

import { join } from 'node:path';
import { loadRoute } from '../utils/loadRoute';
import { windowManager } from './Manager';

import * as paths from '@/utils/paths';

let mainWindow: BrowserWindow | null;

const openMainWindow = (): BrowserWindow => {
  if (mainWindow) {
    mainWindow.show();
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 1000,
    webPreferences: {
      preload: join(paths.ROOT, 'backend', 'build', 'preload.js'),
    },
  });

  loadRoute(mainWindow, '/');

  mainWindow.show();
  return mainWindow;
};

const closeMainWindow = (): void => {
  if (mainWindow) {
    mainWindow.close();
  }
};

windowManager.setMainWindow({ open: openMainWindow, close: closeMainWindow });
