import { BrowserWindow } from 'electron';

import { join } from 'node:path';
import { loadRoute } from '../utils/loadRoute';
import { windowManager } from './Manager';

import * as paths from '@/utils/paths';

let preferencesWindow: BrowserWindow | null;

const openPreferencesWindow = (): BrowserWindow => {
  if (preferencesWindow) {
    preferencesWindow.show();
    return preferencesWindow;
  }

  preferencesWindow = new BrowserWindow({
    title: 'Preferences',
    width: 1000,
    height: 750,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: join(paths.ROOT, 'backend', 'build', 'preload.js'),
    },
  });

  preferencesWindow.on('close', () => {
    preferencesWindow = null;
  });

  loadRoute(preferencesWindow, '/');

  return preferencesWindow;
};

const closePreferencesWindow = (): void => {
  if (preferencesWindow) {
    preferencesWindow.close();
  }
};

windowManager.setPreferencesWindow({ open: openPreferencesWindow, close: closePreferencesWindow });
