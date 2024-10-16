import { ipcRenderer, type IpcMain } from 'electron';
import type { PartialDeep } from 'type-fest';
import type { API, Events } from '../types/ipc';

/**
 * Returns a debounced version of the provided function, ensuring that the
 * function is only called after a specified delay.
 *
 * This function delays the execution of the provided function until after a
 * specified amount of time has passed. If the function is called again before
 * the delay period ends, a new timeout is set, canceling the previous one.
 *
 * This is useful for limiting the rate at which a function is executed.
 *
 * @param func The function to debounce, which will only be called after the delay.
 * @param delay The amount of time, in milliseconds, to wait before calling the function.
 * @returns The debounced function that will only be called after the delay has passed.
 * @example
 *
 * ```ts
 * function handleScroll() {
 *   console.log('Scroll event triggered');
 * }
 *
 * window.addEventListener('scroll', debounce(handleScroll, 300));
 * ```
 */
export function debounce(func: (...args: unknown[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return (...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Deeply merges two objects.
 *
 * This function recursively merges properties from two objects, overriding
 * properties from the `source` object with those from the `overrides` object,
 * allowing for for deep merging without losing any nested properties from any
 * of the objects.
 *
 * @template T The structure of the object.
 *
 * @param source The original object whose properties may be overridden.
 * @param overrides The object that contains properties that will override the
 * values in `source`.
 * @returns A new object with properties from both `source` and `overrides`,
 * @example
 *
 * ```ts
 * import type { PartialDeep } from 'type-fest';
 *
 * type Settings = {
 *   layout: string;
 *   theme: {
 *     color: string;
 *   };
 * };
 *
 * const defaultSettings: Settings = {
 *   layout: 'grid',
 *   theme: {
 *     color: 'blue',
 *   },
 * };
 *
 * const userSettings: PartialDeep<Settings> = {
 *   theme: {
 *     color: 'purple',
 *   },
 * };
 *
 * const settings = merge(defaultSettings, userSettings);
 * // {
 * //   layout: 'grid',
 * //   theme: {
 * //     color: 'purple',
 * //   },
 * // }
 * ```
 */
export function merge<T extends Record<string, unknown>>(source: T, overrides: PartialDeep<T>): T {
  const result = { ...source };

  for (const key in overrides) {
    const value = overrides[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = merge(result[key] as Record<string, unknown>, value) as T[typeof key];
    } else {
      result[key] = value as T[typeof key];
    }
  }

  return result;
}

export function registerIPC(ipc: IpcMain, events: Events) {
  for (const key in events) {
    if (typeof events[key] === 'function') {
      ipc.on(key, events[key]);
    } else {
      registerIPC(ipc, events[key]);
    }
  }
}

export function generateAPI<E extends Events>(events: E): API<E> {
  const api: Record<string, unknown> = {};

  for (const key in events) {
    const value = events[key];

    if (typeof value === 'function') {
      api[key] = (...args: unknown[]) => ipcRenderer.send(key, ...args);
    } else {
      api[key] = generateAPI(value);
    }
  }

  return api as API<E>;
}
