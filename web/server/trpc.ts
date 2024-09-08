import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../auth";
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ next }) =>  {
    let session = await auth();
    if (!session || !session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...session, user: session.user },
      },
    });
  })