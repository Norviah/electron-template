import type { Route } from 'next';

declare module 'next/navigation' {
  export function usePathname<T extends string = string>(): Route<T>;
}
