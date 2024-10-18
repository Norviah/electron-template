import type { PartialDeep } from 'type-fest';

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
