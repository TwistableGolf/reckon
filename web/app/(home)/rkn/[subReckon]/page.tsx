import { api } from "@/../server/trpc/server";
import PostList from "@/components/posts/post-list";
import { notFound } from "next/navigation";
import SubReckonSummary from "./subreckon-summary";
import SubreckonPosts from "./subreckon-posts";

export default async function Page({
  params,
}: {
  params: { subReckon: string };
}) {
  let subReckon = await api.subReckon.byId(params.subReckon);

  if (subReckon == null) {
    return notFound();
  }

  let posts = await api.post.bySubReckon(subReckon.name);
  return (
    <main className="p-3 xl:mx-32 m-0 transition-all grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className="sm:hidden block ">
        <SubReckonSummary subReckon={subReckon}></SubReckonSummary>
      </div>
      <div className="sm:col-span-2">
        <SubreckonPosts subReckon={subReckon} initialPosts={posts}></SubreckonPosts>
      </div>
      <div className="hidden sm:block">
        <SubReckonSummary subReckon={subReckon}></SubReckonSummary>
      </div>
    </main>
  );
}
