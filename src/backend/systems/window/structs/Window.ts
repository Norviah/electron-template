import { is } from '@electron-toolkit/utils';
import { BrowserWindow, type BrowserWindowConstructorOptions, shell } from 'electron';
import { join } from 'node:path';

import * as paths from '@shared/lib/paths';

import type { Route } from '@shared/types';

/**
 * Abstract base class for managing a window.
 *
 * This class implements logic for basic window management, such as opening a
 * window and event handling. It provides a foundation which can be extended for
 * more specific needs or behavior.
 *
 * @example
 *
 * ```tsx
 * public class ApplicationManager extends WindowManager {
 *   public get settings(): BrowserWindowConstructorOptions | undefined {
 *     return { /* ... *\/ };
 *   }
 *
 *   public override open(): void {
 *     super.open();
 *
 *     // Additional logic to run after the window is opened.
 *   }
 * }
 * ```
 */
export abstract class WindowManager {
  /**
   * The manager's window instance.
   *
   * If the manager has opened a window, this property will reference that window
   * instance
   */
  public window: BrowserWindow | null = null;

  /**
   * The window's route.
   *
   * When creating a new window, the manager will open the window to this
   * specified route.
   */
  public abstract path: Route;

  /**
   * Whether to enable dev tools when creating a new window.
   *
   * If this flag is enabled, the manager will open the dev tools for the window
   * if the application is running for development.
   */
  public enableDevToolsByDefault = false;

  /**
   * Settings when constructing a new window.
   */
  public get settings(): BrowserWindowConstructorOptions {
    const settings: BrowserWindowConstructorOptions = {
      show: false,
      autoHideMenuBar: true,
      frame: false,
      titleBarStyle: 'hidden',
      webPreferences: { preload: join(__dirname, '..', 'preload/preload.js'), sandbox: false },
      ...(process.platform === 'linux' ? { icon: paths.ICON_PNG } : {}),
    };

    return settings;
  }

  /**
   * Initializes a new `BrowserWindow` instance.
   *
   * This method initializes a new window instance for the manager and handles
   * additional logic for the window, such as ensuring external links are opened
   * in the user's default browser.
   */
  public open(): void {
    if (this.window) {
      return;
    }

    const window = new BrowserWindow(this.settings);

    window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);

      return {
        action: 'deny',
      };
    });

    if (is.dev && this.enableDevToolsByDefault) {
      window.webContents.openDevTools();
    }

    window.on('ready-to-show', () => {
      window.show();
    });

    window.on('closed', this.onClosed.bind(this));
    window.on('resized', this.onResized.bind(this));

    this.window = window;

    this.load(this.path);
  }

  /**
   * Loads content into the window.
   *
   * As determined by the router within the frontend section of the application,
   * this method loads the specified route into the window. It also handles
   * loading the correct source based on the environment.
   *
   * @param path The specified route to load in the window.
   */
  public load(path: Route): void {
    if (!this.window) {
      return;
    }

    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
      this.window.loadURL(
        `${process.env.ELECTRON_RENDERER_URL}${path && path !== '/' ? `#${path}` : ''}`,
      );
    } else {
      const hash = path && path !== '/' ? path : undefined;

      this.window.loadFile(join(__dirname, '../renderer/index.html'), {
        hash,
      });
    }
  }

  /**
   * Called when the window is closed.
   *
   * When the window is closed, this method is called to clean up any resources
   * or remove references to the window instance.
   *
   * @see https://www.electronjs.org/docs/latest/api/browser-window#event-closed
   */
  protected onClosed(): void {
    this.window = null;
  }

  /**
   * Called when the window has finished being resized.
   *
   * @see https://www.electronjs.org/docs/latest/api/browser-window#event-resized-macos-windows
   */
  protected onResized(): void {
    return;
  }
}
