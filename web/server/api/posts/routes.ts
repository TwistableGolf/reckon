import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

type Post = {
    id: string;
    title: string;
    content: string;
  };
  
const json = `{"5f2051c3-c6cb-47b2-8c80-78b44807a262":{"id":"5f2051c3-c6cb-47b2-8c80-78b44807a262","title":"Massaman Curry","content":"Tenderly braised venison in a rich jerk and parsnip sauce, served with a side of creamy red pepper."},"563ae35c-a2b9-45f1-a95c-ddb812327ceb":{"id":"563ae35c-a2b9-45f1-a95c-ddb812327ceb","title":"Cranberry Pie","content":"Grilled venison kebabs, marinated in Bashkir spices and served with a fresh chillies and lychee salad."},"52f60b9f-87a4-4e86-bd04-2807bb51f998":{"id":"52f60b9f-87a4-4e86-bd04-2807bb51f998","title":"Pasta With Tomato And Basil","content":"Fresh mixed greens tossed with fennel seed-rubbed emu, french eschallots, and a light dressing."},"c683dc99-cd33-47b1-a202-1b20555e310f":{"id":"c683dc99-cd33-47b1-a202-1b20555e310f","title":"Pho","content":"A delightful tart combining tender jicama and sweet juniper berry, set in a buttery pastry shell and finished with a hint of orange zest."},"46996e10-a8d9-447b-846c-10e051938f7d":{"id":"46996e10-a8d9-447b-846c-10e051938f7d","title":"Chicken Parm","content":"A succulent duck steak, encased in a zesty cardamom crust, served with a side of cayenne pepper mashed turnips."},"ed1c8558-0b4c-4127-982e-aa25ed2de353":{"id":"ed1c8558-0b4c-4127-982e-aa25ed2de353","title":"Rockmelon And Longan Tart","content":"Three snowpeas with hijiki, brussels sprouts, dried chinese broccoli, bean sprouts and edamame. With a side of baked starfruit, and your choice of star fruit or lettuce."},"aab21354-e352-4b43-949c-008bb7f6b2dd":{"id":"aab21354-e352-4b43-949c-008bb7f6b2dd","title":"Chicken Wings","content":"Fresh bush tomato with a pinch of achiote seed, topped by a caramelized lemon with whipped cream"},"fb6aee50-0bb7-4dc5-909d-12005abeeee3":{"id":"fb6aee50-0bb7-4dc5-909d-12005abeeee3","title":"Vanilla-crusted Rabbit","content":"A slow-roasted Black-winged Stilt with a rich, zesty exterior. Stuffed with cherry and covered in rockmelon sauce. Sides with snowpea sprouts puree and wild arugula."},"d5d67a5c-b460-457a-bac5-5876baaa99f3":{"id":"d5d67a5c-b460-457a-bac5-5876baaa99f3","title":"Caesar Salad","content":"A robust smoky stew featuring Chinese flavors, loaded with fluffy meat, crispy vegetables, and a rich, sour broth."},"9ee880ab-31cf-484c-a336-164185357be2":{"id":"9ee880ab-31cf-484c-a336-164185357be2","title":"Sour Portuguese Stew","content":"Crispy fried ostrich bites, seasoned with pepper and served with a tangy mango dipping sauce."}}`;
const posts: { [id: string]: Post } = JSON.parse(json);


export const postRoutes = createTRPCRouter({
    ids: publicProcedure.query(async () => {
      const postArray: string[] = [];
      for (let post in posts) {
        postArray.push(posts[post].id);
      }
      return postArray;
    }),

    byId: publicProcedure.input(z.string().uuid()).query(async (opts) => {
      await new Promise((r) => setTimeout(r, 500));
      if (Math.random() > 0.9) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to load post ${opts.input}`,
        });
      }
      if (opts.input in posts) {
        return posts[opts.input];
      }
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Post with id ${opts.input} not found`,
      });
    }),
  })