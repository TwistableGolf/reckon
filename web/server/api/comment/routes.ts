import { z } from "zod";
import { createTRPCRouter, onboardedProcedure, protectedProcedure, publicProcedure } from "../trpc";
import { nanoid10Regex } from "../posts/routes";
import { TRPCError } from "@trpc/server";

export const commentRoutes = createTRPCRouter({
  byPost: publicProcedure.input(z.string().regex(nanoid10Regex)).query(async (opts) => {
    var comments = await opts.ctx.db.comment.findMany({
      where: {
        postId: opts.input,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return comments;
  }),

  postComment: onboardedProcedure
    .input(
      z.object({
        parentCommentId: z.string().regex(nanoid10Regex).optional(),
        postId: z.string().regex(nanoid10Regex),
        comment: z.string(),
        id: z.string().regex(nanoid10Regex).optional()
      })
    )
    .mutation(async (opts) => {
      if (opts.input.id != null) {
        const existingComment = await opts.ctx.db.comment.findUniqueOrThrow({
          where: {
            id: opts.input.id,
          },
        });

        if (existingComment.authorId != opts.ctx.user.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
      }

      return await opts.ctx.db.comment.upsert({
        where: {
          id: opts.input.id ?? "",
        },
        update: {
          content: opts.input.comment,
        },
        create: {
          content: opts.input.comment,
          parentCommentId: opts.input.parentCommentId,
          postId: opts.input.postId,
          authorId: opts.ctx.user.id
        },
      });
    }),
});
