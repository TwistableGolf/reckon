import { auth } from "../auth";
import Header from "./components/header";
import PostList from "./components/posts/post-list";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header></Header>
      <main className="p-3 ">
        <PostList></PostList>
      </main>
    </>
  );
}
