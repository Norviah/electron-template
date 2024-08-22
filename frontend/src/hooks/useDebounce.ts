import { useEffect, useState } from 'react';

/**
 * A custom hook that resolves a value after a specified delay.
 *
 * @template T The type of the value to debounce.
 * @param value The value to debounce.
 * @param delay The amount of time (in milliseconds) to wait before updating the
 * debounced value.
 * @returns The debounced value.
 *
 * @example
 *
 * ```tsx
 * function Component() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *
 *   const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 *   useEffect(() => {
 *     // do something with the new value
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *     />
 *   )
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
