import Link from "next/link";
import PostList from "../components/posts/post-list";
import Header from "../components/header";

export default async function Home() {
  return (
    <>
      <main className="p-3 xl:mx-32 m-0">
        <Link href="/rkn/teste">Nav</Link>
        <PostList></PostList>
      </main>
    </>
  );
}
