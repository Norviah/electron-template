import { Menu, Tray, app, nativeImage } from 'electron';

import * as paths from '@shared/lib/paths';

export let tray: Tray | null = null;

export function initializeTray() {
  const icon = nativeImage.createFromPath(paths.ICON);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip(app.getName());
  tray.setTitle(app.getName());
}
