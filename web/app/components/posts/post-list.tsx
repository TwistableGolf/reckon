"use client";
import { trpc } from "@/_trpc/client";
import PostPreview from "./post-preview";

export default function PostList() {
  let posts = trpc.post.ids.useQuery();

  return (
    <div className="md:grid grid-cols-2 flex flex-col gap-4">
      {posts.status === "success" ? (
        <>
          {posts.data?.map((item, index) => {
            return <PostPreview key={item} id={item}></PostPreview>;
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
