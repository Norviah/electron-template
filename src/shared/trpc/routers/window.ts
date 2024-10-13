import { publicProcedure, router } from ".."

export const windowRouter = router({
  closeWindow: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) {
      return;
    }

    ctx.window.close();
  }),

  minimize: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.window) {
      return;
    }

    ctx.window.minimize();
  }),

  maximize: publicProcedure.mutation(({ ctx }) => {
    if (!ctx.window) {
      return;
    }

    ctx.window.isMaximized() ? ctx.window.unmaximize() : ctx.window.maximize();
  }),
});