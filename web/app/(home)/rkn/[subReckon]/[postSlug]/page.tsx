import { api } from "../../../../../server/trpc/server";
import { notFound } from "next/navigation";
import PostFull from "@/components/posts/post-full";
import Comments from "@/components/comments/comments";
import { useAuth } from "@/components/protected-page";
import Reply from "@/components/comments/reply";

export default async function Page({
  params
}: {
  params: { subReckon: string; postSlug: string };
  authed: boolean
}) {
  const authState = await useAuth();
  const post = await api.post.bySlug(params.postSlug);
  if (post.subReckonId != params.subReckon) {
    notFound();
  }
  const comments = await api.comment.byPost(params.postSlug);

  return (
    <main className="p-3 xl:mx-32 m-0  transition-all grid grid-cols-1 gap-4">
      <PostFull post={post}></PostFull>
      <Reply postId={post.slug} onPosted={()=>{}}></Reply>
      <Comments initialComments={comments} postSlug={params.postSlug} authed={authState.authed}></Comments>
    </main>
  );
}
