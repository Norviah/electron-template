import type { PartialDeep } from 'type-fest';

/**
 * Debounces the provided function, ensuring that the function is only called
 * after a delay.
 *
 * This function delays the execution of the provided function until after a
 * specified amount of time has passed. If the function is called again before
 * the delay, the previous timeout is cleared and a new one is set.
 *
 * This is useful for limiting the rate at which a function is executed.
 *
 * @param func The function to debounce.
 * @param delay The amount of time to wait before calling the function.
 * @returns The debounced function that will only be called after the delay.
 * @example
 *
 * ```ts
 * function handleScroll() {
 *   console.log('Scroll event triggered');
 * }
 *
 * // Only called after 300ms of no scrolling.
 * window.addEventListener('scroll', debounce(handleScroll, 300));
 * ```
 */
export function debounce(func: (...args: unknown[]) => void, delay: number) {
  let id: NodeJS.Timeout;

  return (...args: unknown[]) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => func(...args), delay);
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
