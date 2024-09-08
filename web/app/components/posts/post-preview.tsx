"use client";
import { trpc } from "@/_trpc/client";

function PostCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2 dark:bg-neutral-800 bg-neutral-100 shadow dark:shadow-neutral-900 dark:border-white rounded-md p-2">
      {children}
    </div>
  );
}

export default function PostPreview({ id }: { id: string }) {
  const preview = trpc.post.byId.useQuery(id);

  if (preview.status === "pending") {
    return (
      <PostCard>
        <div className="dark:bg-neutral-300 bg-neutral-700 w-1/2 h-4 rounded animate-pulse"></div>
        <div className="dark:bg-neutral-300 bg-neutral-700 w-3/4 h-8 rounded animate-pulse"></div>
        <div className="dark:bg-neutral-300 rounded h-2 bg-neutral-700 animate-pulse w-1/3 place-self-end"></div>
      </PostCard>
    );
  }

  if (preview.status === "error") {
    console.log(preview.error);
    return <h1>Failed to load post: {preview.error.message}</h1>;
  }

  return (
    <PostCard>
      <h3 className="text-lg">{preview.data?.title}</h3>
      <p className="text-sm text-neutral-700 dark:text-gray-300">{preview.data?.content}</p>
      <p className="text-xs place-self-end text-neutral-700 dark:text-gray-300">
        {preview.data?.id}
      </p>
    </PostCard>
  );
}
