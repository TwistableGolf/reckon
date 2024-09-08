import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

const snippetSelect = {
    posts: false,
    name: true,
    email: true,
    id: true
  } satisfies Prisma.UserSelect;


export const userRoutes = createTRPCRouter({
    snippetBySession: protectedProcedure.query(async (opts)=>{
        if(opts.ctx.session.user.email == null){
            throw new TRPCError({code: 'NOT_FOUND'})
        }
        console.log(opts.ctx.session.user.email);

        const user = await opts.ctx.db.user.findUnique({
            where:{
                email: opts.ctx.session.user.email
            },
            select: snippetSelect
        });

        console.log(user);

        return user;
    })
});