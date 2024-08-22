import electronServe from 'electron-serve';

import { type BrowserWindow, app } from 'electron';

import * as paths from '@/utils/paths';

import type { Route } from 'next';

const serve = app.isPackaged ? electronServe({ directory: paths.FRONTEND_OUT }) : null;

export function loadRoute<Path extends Route>(window: BrowserWindow, route: Path): void {
  if (serve) {
    serve(window).then(() => window.loadURL(`app://.${route}`));
  } else {
    window.loadURL(`http://localhost:3000/${route}`);
    window.webContents.openDevTools();
    window.webContents.on('did-fail-load', () => {
      window.webContents.reloadIgnoringCache();
    });
  }
}
