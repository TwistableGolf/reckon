import {
  createCallerFactory,
  createTRPCRouter,
} from "../api/trpc";

import { subReckonRoutes } from "./sub-reckon/routes";
import { postRoutes } from "./posts/routes";
import { userRoutes } from "./user/routes";
import { commentRoutes } from "./comment/routes";


export const appRouter = createTRPCRouter({
  subReckon: subReckonRoutes,
  post: postRoutes,
  comment: commentRoutes,
  user: userRoutes
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
