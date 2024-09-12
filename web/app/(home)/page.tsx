import { Post } from "@prisma/client";
import PostList from "../components/posts/post-list";

export default async function Home() {
  const posts: Post[] = [];
  return (
    <>
      <main className="p-3 xl:mx-32 m-0 transition-all flex">
        <PostList posts={posts}></PostList>
      </main>
    </>
  );
}
