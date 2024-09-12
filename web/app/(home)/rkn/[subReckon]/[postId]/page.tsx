import { api } from "../../../../../server/trpc/server";
import { notFound } from "next/navigation";
import PostFull from "@/components/posts/post-full";
import Comments from "@/components/comments/comments";

export default async function Page({
  params,
}: {
  params: { subReckon: string; postId: string };
}) {
  const post = await api.post.byId(params.postId);
  if (post.subReckonId != params.subReckon) {
    notFound();
  }
  const comments = await api.comment.byPost(params.postId);

  return (
    <main className="p-3 xl:mx-32 m-0  transition-all grid grid-cols-1 gap-4">
      <PostFull post={post}></PostFull>
      <Comments initialComments={comments} postId={params.postId}></Comments>
    </main>
  );
}
