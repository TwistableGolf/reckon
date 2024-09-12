"use client";
import { Post, SubReckon } from "@prisma/client";
import { trpc } from "@/_trpc/client";
import PostList from "@/components/posts/post-list";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SortType } from "../../../../server/api/posts/routes";

export default function SubreckonPosts({
  subReckon,
  sort,
  initialPosts,
}: {
  subReckon: SubReckon;
  sort: SortType,
  initialPosts: Post[];
}) {

  let query = trpc.post.bySubReckon.useQuery(
    {
      subReckonName: subReckon.name,
      sort,
      last: "All",
    },
    {
      initialData: initialPosts
    }
  );
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
    return <PostList posts={query.data}></PostList>;
  }
}
