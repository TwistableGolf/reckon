"use client";
import { Comment, Post, SubReckon } from "@prisma/client";
import { trpc } from "@/_trpc/client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CommentTile from "./comment";
import { CommentWithAuthor } from "@/types/db-types";

export type CommentWithLevel = CommentWithAuthor & {
  level: number;
  children: CommentWithLevel[];
};

export default function Comments({
  postSlug,
  initialComments,
  authed,
}: {
  postSlug: string;
  initialComments: CommentWithAuthor[];
  authed: boolean;
}) {
  let query = trpc.comment.byPost.useQuery(postSlug, {
    initialData: initialComments,
  });
  let path = usePathname();

  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  useEffect(() => {
    if (loaded) {
      query.refetch();
    }
  }, [path]);

  if (query.isLoading) {
  } else if (query.isSuccess) {
    let commentDictionary: { [key: string]: CommentWithLevel } = {};

    query.data.forEach((element) => {
      commentDictionary[element.id] = { ...element, level: 0, children: [] };
    });

    const rootComments: CommentWithLevel[] = [];

    query.data.forEach((item) => {
      if (item.parentCommentId == null) {
        rootComments.push(commentDictionary[item.id]);
      } else {
        commentDictionary[item.parentCommentId].children.push(
          commentDictionary[item.id]
        );
      }
    });
    function applyLevel(level: number, comment: CommentWithLevel) {
      comment.level = level;
      comment.children.forEach((element) => {
        applyLevel(level + 1, element);
      });
    }
    rootComments.forEach((element) => {
      applyLevel(0, element);
    });

    return (
      <div>
        <h1 className="font-bold mb-2">
          {query.data.length} Comment
          {query.data.length == 0 || query.data.length > 1 ? "s" : ""}
        </h1>
        <div className="flex flex-col gap-4">
          {rootComments.map((item, index) => {
            return (
              <CommentTile
                authed={authed}
                key={item.id}
                comment={item}
                replyPosted={query.refetch}
              ></CommentTile>
            );
          })}
        </div>
      </div>
    );
  }
}
