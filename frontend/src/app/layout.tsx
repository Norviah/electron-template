import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/ToastProvider';

import { overpass } from '@/lib/font';
import { cn } from '@/lib/utils';

import type { LayoutProps } from '@/types';

import './globals.css';

export default function RootLayout(props: LayoutProps): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('min-h-screen text-foreground-light antialiased', overpass.className)}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
        <TailwindIndicator />
        <ToastProvider className={overpass.className} />
      </body>
    </html>
  );
}
