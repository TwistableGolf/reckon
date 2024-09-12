import { Post } from "@prisma/client";
import PostPreview from "./post-preview";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((item, index) => {
        return <PostPreview key={item.id} post={item}></PostPreview>;
      })}
    </div>
  );
}
