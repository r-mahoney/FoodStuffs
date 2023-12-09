import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const itemsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.item.findMany({ orderBy: desc(schema.item.item_name) });
  }),

  create: protectedProcedure
    .input(
      z.object({
        item_name: z.string().min(1),
        number: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.item).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.item).where(eq(schema.item.id, input));
  }),
});
