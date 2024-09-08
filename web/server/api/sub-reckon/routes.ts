import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const subReckonRoutes = createTRPCRouter({
  byId: publicProcedure.input(z.string()).query(async (opts) => {
    return opts.ctx.db.subReckon.findUnique({
      where: {
        name: opts.input,
      },
    });
  }),
});
