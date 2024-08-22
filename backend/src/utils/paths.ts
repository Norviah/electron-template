import { join } from 'node:path';
import { path } from 'app-root-path';
import { app } from 'electron';

/**
 * The absolute path to the root of the project.
 */
export const ROOT: string = path;

/**
 * The absolute path to electron's binary.
 */
export const ELECTRON: string = join(ROOT, 'node_modules', '.bin', 'electron');

/**
 * The absolute path to the assets folder.
 */
export const ASSETS: string = app.isPackaged ? join(ROOT, '..', 'assets') : join(ROOT, 'assets');

/**
 * The absolute path to the icon for the application.
 */
export const ICON: string = join(ASSETS, 'icon.ico');

/**
 * The absolute path to the next.js' build output.
 */
export const FRONTEND_OUT: string = join(ROOT, 'frontend', 'out');
