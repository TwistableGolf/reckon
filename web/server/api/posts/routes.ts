import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, onboardedProcedure, publicProcedure } from "../trpc";


const LastEnum = z.enum(["All", "Year", "Month", "Week", "Day"]);
export type LastType = z.infer<typeof LastEnum>;

const SortEnum = z.enum(["top", "latest"]);
export type SortType = z.infer<typeof SortEnum>;

export const nanoid10Regex = /^[a-z0-9_-]{10}$/i;

export const postRoutes = createTRPCRouter({
  bySlug: publicProcedure.input(z.string().regex(nanoid10Regex)).query(async (opts) => {
    let post = await opts.ctx.db.post.findUnique({
      where: { slug: opts.input },
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

  post: onboardedProcedure
    .input(
      z.object({
        title: z.string().max(256),
        content: z.string().max(8192),
        subReckon: z.string().max(256),
        slug: z.string().regex(nanoid10Regex).optional(),
      })
    )
    .mutation(async (opts) => {
      if (opts.input.slug != null) {
        const existingPost = await opts.ctx.db.post.findUniqueOrThrow({
          where: {
            slug: opts.input.slug,
          },
        });

        if (existingPost.authorId != opts.ctx.user.id) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
      }

      return await opts.ctx.db.post.upsert({
        where: {
          slug: opts.ctx.user.email,
        },
        update: {
          title: opts.input.title,
        },
        create: {
          title: opts.input.title,
          content: opts.input.content,
          authorId: opts.ctx.user.id,
          subReckonId: opts.input.subReckon,
        },
      });
    }),
});
