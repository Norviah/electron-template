import { WindowManager } from '../structs/Window';

import { settings } from '../../../lib/settings';

import type { Route } from '@shared/types';
import type { BrowserWindowConstructorOptions } from 'electron';

/**
 * The window manager for the main application.
 *
 * This manager is responsible for creating and managing the window for the main
 * application, i.e. the main window that is displayed when the application is
 * opened.
 */
export class Application extends WindowManager {
  /**
   * Whether to enable dev tools when creating a new window.
   *
   * When a new window is created, this flag is used to determine if the dev
   * tools should be opened by default when in development mode.
   */
  public enableDevToolsByDefault = true;

  /**
   * The window's route.
   *
   * When creating a new window, the manager will open the window to this
   * specified route. If no route is provided, the manager will load the index
   * route.
   */
  public path: Route = '/';

  /**
   * Settings to use when constructing a new window.
   */
  public get settings(): BrowserWindowConstructorOptions {
    const { width, height } = settings.get('dimensions');

    return {
      ...super.settings,
      width,
      height,
      minHeight: 670,
      minWidth: 900,
    };
  }

  /**
   * Called once the window has finished being resized.
   *
   * We'll watch this event to save the window's dimensions on disk, persisting
   * the window's size between sessions.
   *
   * @see https://www.electronjs.org/docs/latest/api/browser-window#event-resized-macos-windows
   */
  protected override onResized(): void {
    if (!this.window) {
      return;
    }

    const [width, height] = this.window.getSize();
    settings.set('dimensions', { width, height });
  }
}
