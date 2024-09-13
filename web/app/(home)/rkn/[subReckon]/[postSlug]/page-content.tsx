"use client";
import { trpc } from "@/_trpc/client";
import Comments from "@/components/comments/comments";
import Reply from "@/components/comments/reply";
import PostFull from "@/components/posts/post-full";
import { CommentWithAuthor } from "@/types/db-types";
import { Post } from "@prisma/client";

export default function PostPage({
  post,
  comments,
  authed,
}: {
  post: Post;
  comments: CommentWithAuthor[];
  authed: boolean;
}) {
  let query = trpc.comment.byPost.useQuery(post.slug, {
    initialData: comments,
  });
  return (
    <div className="flex flex-col gap-2">
      <PostFull post={post}></PostFull>
      {authed && (
        <Reply
          postId={post.slug}
          onPosted={() => {
            query.refetch();
          }}
        ></Reply>
      )}
      <Comments
        initialComments={comments}
        postSlug={post.slug}
        authed={authed}
      ></Comments>
    </div>
  );
}
