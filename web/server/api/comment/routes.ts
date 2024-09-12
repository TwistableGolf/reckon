import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const commentRoutes = createTRPCRouter({
    byPost: publicProcedure.input(z.string().uuid()).query(async (opts)=>{
        var comments = await opts.ctx.db.comment.findMany(
            {
                where:{
                    postId: opts.input
                },
                include:
                {
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        )
        return comments;
    })
});