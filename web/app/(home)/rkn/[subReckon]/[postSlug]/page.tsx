import { api } from "../../../../../server/trpc/server";
import { notFound } from "next/navigation";
import PostFull from "@/components/posts/post-full";
import Comments from "@/components/comments/comments";
import { useAuth } from "@/components/protected-page";
import Reply from "@/components/comments/reply";
import PostPage from "./page-content";
import SubReckonSummary from "../subreckon-summary";

export default async function Page({
  params,
}: {
  params: { subReckon: string; postSlug: string };
  authed: boolean;
}) {
  const authState = await useAuth();
  const post = await api.post.bySlug(params.postSlug);
  const subReckon = await api.subReckon.byId(params.subReckon);
  if (post.subReckonId != params.subReckon || subReckon == null) {
    notFound();
  }
  const comments = await api.comment.byPost(params.postSlug);

  return (
    <main className="p-3 xl:mx-32 m-0  transition-all grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className="col-span-2">
        <PostPage
          post={post}
          comments={comments}
          authed={authState.authed}
        ></PostPage>
      </div>
      <div>
        <SubReckonSummary subReckon={subReckon} onHome={false}></SubReckonSummary>
      </div>
    </main>
  );
}
