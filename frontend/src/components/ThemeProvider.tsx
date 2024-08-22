'use client';

import { ThemeProvider as BaseThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element {
  return <BaseThemeProvider {...props}>{children}</BaseThemeProvider>;
}
