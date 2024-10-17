import { path as ROOT } from 'app-root-path';
import { app } from 'electron';
import { join } from 'node:path';

export { ROOT };

export const RESOURCES: string = app.isPackaged ? join(ROOT, '..', 'assets') : join(ROOT, 'assets');
export const ICON: string = join(RESOURCES, 'icon.ico');
export const ICON_PNG: string = join(RESOURCES, 'icon.png');
