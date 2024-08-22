import { Menu, Tray, app, nativeImage } from 'electron';
import { windowManager } from './window/structs/Manager';

import * as paths from '@/utils/paths';

let tray: Tray | null = null;

export const initializeTray = (): void => {
  tray = new Tray(nativeImage.createFromPath(paths.ICON));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click() {
        windowManager.main?.open();
      },
    },
    {
      label: 'Quit',
      click() {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.setToolTip('APP NAME');
  tray.setTitle('APP NAME');
};
