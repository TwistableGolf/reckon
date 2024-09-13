import { api } from "@/../server/trpc/server";
import { notFound } from "next/navigation";
import SubReckonSummary from "./subreckon-summary";
import SubreckonPosts from "./subreckon-posts";
import { SortType } from "../../../../server/api/posts/routes";

export default async function Page({
  params,
  searchParams,
}: {
  params: { subReckon: string };
  searchParams: { sort: string };
}) {
  let subReckon = await api.subReckon.byId(params.subReckon);

  if (subReckon == null) {
    return notFound();
  }

  const validSortValues = ["top", "latest"] as const;
  const sort: SortType = validSortValues.includes(
    searchParams?.sort?.toLowerCase() as any
  )
    ? (searchParams.sort.toLowerCase() as SortType)
    : "top";

  let posts = await api.post.bySubReckon({
    subReckonName: subReckon.name,
    sort: sort,
    last: "All",
  });

  return (
    <main className="p-3 xl:mx-32 m-0  transition-all grid sm:grid-cols-3 grid-cols-1 gap-4">
      <div className="sm:hidden block">
        <SubReckonSummary
          subReckon={subReckon}
          onHome={true}
        ></SubReckonSummary>
      </div>
      <div className="sm:col-span-2">
        {posts.length > 0 ? (
          <SubreckonPosts
            subReckon={subReckon}
            initialPosts={posts}
            sort={sort}
          ></SubreckonPosts>
        ) : (
          <div>
            
          </div>
        )}
      </div>
      <div className="hidden sm:block">
        <SubReckonSummary
          subReckon={subReckon}
          onHome={true}
        ></SubReckonSummary>
      </div>
    </main>
  );
}
