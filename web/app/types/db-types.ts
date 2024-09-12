import { Comment } from "@prisma/client";

export type CommentWithAuthor = Comment & {
  author: {
    name: string | null;
  };
};
