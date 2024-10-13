import type { router } from "@frontend/main"

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}