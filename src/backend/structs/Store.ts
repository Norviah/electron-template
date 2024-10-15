import { merge } from '@backend/lib/utils';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import type { Explicit } from '@shared/types';
import type { PartialDeep } from 'type-fest';
import type { ZodObject, ZodRawShape, z } from 'zod';

/**
 * @template Schema The schema of the store.
 * @template T The inferred type of the schema.
 */
export type StoreOptions<Schema extends ZodObject<ZodRawShape>, T extends z.infer<Schema>> = {
  /**
   * The path to the store's file.
   */
  path: string;

  /**
   * The schema of the store.
   */
  schema: Schema;

  /**
   * The store's default data.
   */
  defaults: Explicit<T>;
};

/**
 * A store that persists data to disk.
 *
 * `Store` extends `Map`, virtually having the same API as a `Map` instance. The
 * only difference being that the store persists data to disk.
 *
 * @template Schema The schema of the store.
 * @template T The inferred type of the schema.
 *
 * @example
 *
 * ```ts
 * import { z } from "zod";
 *
 * const store = new Store({
 *   schema: z.object({
 *     dimensions: z.object({ width: z.number(), height: z.number() }),
 *   }),
 *
 *   path: "store.json",
 *
 *   defaults: {
 *     dimensions: { width: 900, height: 670 },
 *   },
 * });
 * ```
 */
export class Store<
  Schema extends ZodObject<ZodRawShape>,
  T extends z.infer<Schema> = z.infer<Schema>,
> extends Map<keyof T, T[keyof T]> {
  /**
   * The path to the store's file.
   */
  public path: string;

  /**
   * The schema of the store.
   */
  public schema: Schema;

  /**
   * The store's default data.
   */
  public defaults: Explicit<T>;

  /**
   * Initializes a new instance of `Store`.
   *
   * @param {StoreOptions<Schema>} options Options for the store.
   */
  public constructor({ path, schema, defaults }: StoreOptions<Schema, T>) {
    super();

    this.path = path;
    this.schema = schema;
    this.defaults = defaults;

    this.init();
  }

  /**
   * Initializes the store.
   *
   * This method loads the store's data, whether it be from disk or the
   * defaults, and sets the data within the map.
   */
  private init(): void {
    const data = this.load();

    for (const key in data) {
      this.set(key, data[key]);
    }
  }

  /**
   * Retrieves the value associated with the specified key.
   *
   * @template K The key to retrieve.
   *
   * @param key The key to retrieve.
   * @returns The key's associated value.
   *
   * @example
   *
   * ```ts
   * store.get("dimensions"); // => { width: number, height: number }
   * ```
   */
  public get<K extends keyof T>(key: K): T[K] {
    return super.get(key) as T[K];
  }

  /**
   * Modifies the value associated with the specified key, after which the store
   * is saved to disk.
   *
   * @template K The key to modify.
   *
   * @param key The key to modify.
   * @param value The new value to associate with the key.
   * @returns The `Store` instance.
   *
   * @example
   *
   * ``ts
   * store.set("dimensions", { width: 1000, height: 800 });
   * ```
   */
  public set<K extends keyof T>(key: K, value: T[K]): this {
    super.set(key, value);

    this.save();

    return this;
  }

  /**
   * Saves the store to disk.
   *
   * If `data` is provided, it is saved to disk; otherwise, the store's current
   * state is saved.
   *
   * @param givenData The specified instance of `T` to save.
   * @returns The saved instance of `T`.
   * @example
   *
   * ```ts
   * store.save();         // Saves the store's current state to disk.
   * store.save(defaults); // Saves the given data to disk.
   * ```
   */
  public save(givenData?: T): T {
    const data = givenData ?? Object.fromEntries(this.entries());

    writeFileSync(this.path, JSON.stringify(data));

    return data as T;
  }

  /**
   * Loads the appropriate data.
   *
   * If the store's file exists, the data is parsed and returned; otherwise, the
   * store's defaults are saved and returned.
   *
   * @returns The loaded data.
   */
  public load(): T {
    if (!existsSync(this.path)) {
      return this.save(this.defaults);
    }

    try {
      return this.save(this.merge());
    } catch {
      return this.save(this.defaults);
    }
  }

  /**
   * Merges the default data with the saved data.
   *
   * When a store is created, it's possible that the store has been given new
   * properties that aren't present in the previously saved data. This method
   * merges the given default data with the saved data, ensuring that all
   * properties are present.
   *
   * @throws {ZodError} If the schema fails to parse the saved data.
   * @returns The merged data.
   */
  private merge(): T {
    const schema = this.schema.partial();
    const savedData = schema.parse(JSON.parse(readFileSync(this.path, 'utf-8'))) as Partial<T>;

    return merge(this.defaults, savedData as PartialDeep<T>);
  }
}
