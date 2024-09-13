import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../../auth";
import { db } from "../db";
import { ZodError } from "zod";
import superjson from "superjson";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();
  let takedb = db();
  return {
    db: takedb,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ next, ctx }) => {
  let session = await auth();
  if (!session || !session.user || session.user.email == null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user }
    },
  });
});

export const onboardedProcedure = t.procedure.use(async ({ next, ctx }) => {
  let session = await auth();
  if (!session || !session.user || session.user.email == null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  let user = await ctx.db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Onboarding not yet complete" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user },
      user
    },
  });
});

