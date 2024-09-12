import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { v4 } from "uuid";

type Post = {
  id: string;
  title: string;
  content: string;
  subReckon: string;
};

const LastEnum = z.enum(["All", "Year", "Month", "Week", "Day"]);
export type LastType = z.infer<typeof LastEnum>;

const SortEnum = z.enum(["top", "latest"]);
export type SortType = z.infer<typeof SortEnum>;

export const postRoutes = createTRPCRouter({
  byId: publicProcedure.input(z.string().uuid()).query(async (opts) => {
    let post = await opts.ctx.db.post.findUnique({
      where: { id: opts.input },
    });
    if (post == null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Post with id ${opts.input} not found`,
      });
    }
    return post;
  }),

  bySubReckon: publicProcedure
    .input(
      z.object({
        subReckonName: z.string(),
        sort: SortEnum,
        last: LastEnum.optional(),
      })
    )
    .query(async (opts) => {
      let currentDate = new Date();

      let daysToSubtract = 0;

      const daysMapping: { [key: string]: number } = {
        All: 10000000,
        Year: 365,
        Month: 30,
        Week: 7,
        Day: 1,
      };

      daysToSubtract = daysMapping[opts.input.last || ""] || 0;

      const earliestDate =
        opts.input.last == "All" || undefined
          ? new Date("1970-01-01")
          : new Date(
              currentDate.setUTCDate(currentDate.getUTCDate() - daysToSubtract)
            );

      return await opts.ctx.db.post.findMany({
        where: {
          subReckonId: opts.input.subReckonName,
          time: {
            gte: earliestDate,
          },
        },
        orderBy:
          opts.input.sort == "latest"
            ? {
                time: "desc",
              }
            : {
                likes: {
                  _count: "desc",
                },
              },
      });
    }),

  post: protectedProcedure
    .input(
      z.object({
        title: z.string().max(256),
        content: z.string().max(8192),
        subReckon: z.string().max(256),
        id: z.string().uuid().optional(),
      })
    )
    .mutation(async (opts) => {
      if (opts.ctx.session.user.email == null) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      if (opts.input.id != null) {
        const existingPost = await opts.ctx.db.post.findUniqueOrThrow({
          where: {
            id: opts.input.id,
          },
        });

        if (existingPost.authorId != opts.ctx.user.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
      }

      return await opts.ctx.db.post.upsert({
        where: {
          id: opts.ctx.session.user.email,
        },
        update: {
          title: opts.input.title,
        },
        create: {
          id: v4(),
          title: opts.input.title,
          content: opts.input.content,
          authorId: opts.ctx.user.id,
          subReckonId: opts.input.subReckon,
        },
      });
    }),
});
