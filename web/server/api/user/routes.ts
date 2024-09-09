import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import {z} from "zod";

const snippetSelect = {
    posts: false,
    name: true,
    email: true,
    id: true
  } satisfies Prisma.UserSelect;


export const userRoutes = createTRPCRouter({
    snippetBySession: protectedProcedure.query(async (opts)=>{
        if(opts.ctx.session.user.email == null){
            throw new TRPCError({code: 'BAD_REQUEST'})
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
    }),

    username: protectedProcedure.input(z.object({
        username: z.string().max(20)
    })).mutation(async (opts)=>{

        if(opts.ctx.session.user.email == null){
            throw new TRPCError({code: 'BAD_REQUEST'})
        }        

        return await opts.ctx.db.user.upsert({
            where:{
                email: opts.ctx.session.user.email
            },
            update:{
                name: opts.input.username
            },
            create:{
                email: opts.ctx.session.user.email,
                name: opts.input.username
            }
        })
    })
});