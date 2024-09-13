import { z } from "zod";
import { createTRPCRouter, onboardedProcedure, protectedProcedure, publicProcedure } from "../trpc";

export const subReckonRoutes = createTRPCRouter({
  byId: publicProcedure.input(z.string()).query(async (opts) => {
    return opts.ctx.db.subReckon.findUnique({
      where: {
        name: opts.input,
      },
    });
  }),
  createSubReckon: onboardedProcedure.input(z.string().min(4)).mutation(async (opts)=>
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
        name: opts.input,
        ownerId: opts.ctx.user.id,
        description: "",
      },
    });
  })
});
