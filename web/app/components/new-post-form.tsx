"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip } from "../components/Tooltip";
import { trpc } from "@/_trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface NewPostInput {
  title: string;
  content: string;
}
export default function NewPostForm({
  subReckonName,
}: {
  subReckonName: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostInput>({ mode: "onChange" });
  const router = useRouter();
  const mutation = trpc.post.post.useMutation();

  const onSubmit: SubmitHandler<NewPostInput> = (data) => {
    if (!mutation.isPending) {
      mutation.mutate({
        subReckon: subReckonName,
        content: data.content,
        title: data.title,
      });
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.back();
    } else {
      console.log(mutation.error);
    }
  }, [mutation]);

  return (
    <>
      <form
        className="mt-2 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label
            className="flex gap-x-1 items-center text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title <Tooltip tooltip="This is a Title field"></Tooltip>
          </label>
          <input
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 256,
                message: "Title must be less than 256 characters",
              },
            })}
            className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${
              errors.title && "border border-red-600"
            }`}
            placeholder="Title"
          />
          {errors.title && (
            <div>
              <span className="text-sm text-red-600">
                {errors.title.message}
              </span>
            </div>
          )}
          <label
            className="flex gap-x-1 items-center text-sm font-bold mb-2"
            htmlFor="title"
          >
            Content <Tooltip tooltip="This is a Content field"></Tooltip>
          </label>
          <input
            {...register("content", {
              required: "Content is required",
              maxLength: {
                value: 8192,
                message: "Content must be less than 20 characters",
              },
            })}
            className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${
              errors.content && "border border-red-600"
            }`}
            placeholder="Content"
          />
          {errors.content && (
            <div>
              <span className="text-sm text-red-600">
                {errors.content.message}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="p-1 w-24 bg-blue-600 text-white rounded-md font-bold self-center"
        >
          Save
        </button>
      </form>
    </>
  );
}
