import { z } from "zod";
import { createTRPCRouter, onboardedProcedure, protectedProcedure, publicProcedure } from "../trpc";

export const subReckonRoutes = createTRPCRouter({
  all: publicProcedure.query(async (opts) => {
    return opts.ctx.db.subReckon.findMany({});
  }),
  byId: publicProcedure.input(z.string()).query(async (opts) => {
    return opts.ctx.db.subReckon.findUnique({
      where: {
        slug: opts.input.toLowerCase(),
      },
    });
  }),
  createSubReckon: onboardedProcedure.input(z.string().min(4).max(32).regex(/^[A-Za-z0-9]+$/)).mutation(async (opts)=>
  {
    return await opts.ctx.db.subReckon.upsert({
      where: {
        ownerId: opts.ctx.user.id,
        name: opts.input,
      },
      update: {
        name: opts.input,
      },
      create: {
        slug: opts.input.toLowerCase(),
        name: opts.input,
        ownerId: opts.ctx.user.id,
        description: "",
      },
    });
  })
});
