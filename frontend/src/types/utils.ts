/**
 * Make all properties in `T` explicitly need a value.
 *
 * `Explicit` constructs a new type where all properties within the original
 * interface are explicitly required. This differs from `Required` in that it
 * does not make any optional properties required, all properties must simply
 * need to be explicitly provided.
 *
 * @template T The provided interface.
 * @example
 *
 * ```ts
 * interface Person {
 *   name: string;
 *   job?: string;
 * }
 *
 * // => Error: As `job` is required.
 *
 * const person: Required<Person> = {
 *   name: "John Appleseed",
 *   job: undefined,
 * }
 *
 * // => No error, as `job` is still optional, but must be explicitly provided.
 *
 * const person: Explicit<Person> = {
 *   name: "John Appleseed",
 *   job: undefined,
 * };
 * ```
 */
export type Explicit<T> = {
  [K in keyof Required<T>]: T[K];
};

/**
 * Ensures that the specified subset of keys in an interface are non-nullable.
 *
 * This type merges an interface with a subset of its keys, marking these
 * properties as required and non-nullable, ensuring that they are provided.
 *
 * @template T The interface to merge.
 * @template K The subset of keys to mark as required and non-nullable.
 *
 * @example
 *
 * ```ts
 * interface Person {
 *   name: string;
 *   job?: string;
 * }
 *
 * declare function greet(person: With<Person, 'job'>): void;
 *
 * const unemployedPerson: Person = {
 *   name: 'John Doe'
 * };
 *
 * greet(unemployedPerson); // Error: `job` is required
 *
 * const employedPerson: With<Person, 'job'> = {
 *   name: 'John Doe',
 *   job: 'Software Engineer'
 * };
 *
 * greet(employedPerson); // OK
 * ```
 */
export type With<T, K extends keyof T> = T & {
  [P in keyof Explicit<T>]: P extends K ? NonNullable<T[P]> : T[P];
};
