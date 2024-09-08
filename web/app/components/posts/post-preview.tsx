"use client";
import { trpc } from "@/_trpc/client";
import { MdError } from "react-icons/md";
import Card from "../card";



export default function PostPreview({ id }: { id: string }) {
  const preview = trpc.post.byId.useQuery(id);

  if (preview.status === "pending") {
    return (
      <Card>
        <div className="dark:bg-neutral-300 bg-neutral-700 w-1/2 h-4 rounded animate-pulse"></div>
        <div className="dark:bg-neutral-300 bg-neutral-700 w-3/4 h-8 rounded animate-pulse"></div>
        <div className="dark:bg-neutral-300 rounded h-2 bg-neutral-700 animate-pulse w-1/3 place-self-end"></div>
      </Card>
    );
  }

  if (preview.status === "error") {
    return (
      <Card>
        <div className="flex gap-x-2 items-center content-center">
          <MdError></MdError> Failed to load
        </div>
        <p className="text-xs mt-auto place-self-end text-neutral-700 dark:text-gray-300">
          {id}
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg">{preview.data?.title}</h3>
      <p className="text-sm text-neutral-700 dark:text-gray-300">
        {preview.data?.content}
      </p>
      <p className="text-xs mt-auto place-self-end text-neutral-700 dark:text-gray-300">
        {preview.data?.id}
      </p>
    </Card>
  );
}
