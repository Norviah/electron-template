import type { router } from '@frontend/index';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
