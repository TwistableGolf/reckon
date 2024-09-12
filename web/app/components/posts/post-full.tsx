import Link from "next/link";
import Card from "../card";
import { Post } from "@prisma/client";

export default function PostFull({ post }: { post: Post }) {
  return (
    <Card>
      <h3 className="font-bold text-lg">{post?.title}</h3>
      <p className="text-neutral-700 dark:text-gray-300">
        {post?.content}
      </p>
    </Card>
  );
}
