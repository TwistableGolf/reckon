import PostList from "../components/posts/post-list";

export default async function Home() {
  return (
    <>
      <main className="p-3 xl:mx-32 m-0 transition-all">
        <PostList></PostList>
      </main>
    </>
  );
}
