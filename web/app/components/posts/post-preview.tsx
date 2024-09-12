import Link from "next/link";
import Card from "../card";
import { Post } from "@prisma/client";

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Card>
      <Link href={`/rkn/${post.subReckonId}/${post.id}`}>
        <h3 className="text-lg">{post?.title}</h3>
      </Link>
      <p className="text-sm text-neutral-700 dark:text-gray-300">
        {post?.content}
      </p>
      <p className="text-xs mt-auto place-self-end text-neutral-700 dark:text-gray-300">
        {post?.id}
      </p>
    </Card>
  );
}
