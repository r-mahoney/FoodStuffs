import { authRouter } from "./router/auth";
import { itemsRouter } from "./router/items";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  items: itemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
