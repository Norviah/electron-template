import { publicProcedure, router } from "..";
import { windowRouter } from "./window";

export const appRouter = router({
  window: windowRouter,

  ping: publicProcedure.query(async () => {
    console.log("pong");
  })
});

export type AppRouter = typeof appRouter;
