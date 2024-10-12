import type { router } from "@renderer/main"

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}