"use client";
import Card from "@/components/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip } from "@/components/Tooltip";
import { trpc } from "@/_trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CommentWithAuthor } from "@/types/db-types";

interface CommentForm {
  comment: string;
}
export default function Reply({postId, parentComment, onPosted}: {postId: string, parentComment?: CommentWithAuthor, onPosted:()=>void}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm
>({ mode: "onChange" });
  const mutation = trpc.comment.postComment.useMutation();

  const onSubmit: SubmitHandler<CommentForm
> = (data) => {
    mutation.mutate({
      comment: data.comment,
      postId,
      parentCommentId: parentComment?.id,
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
        onPosted();
    } else {
      console.log(mutation.error);
    }
  }, [mutation]);

  return (
    <Card>
      <form
        className="mt-2 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>

          <input
            {...register("comment", {
              required: "Comment is required",
              maxLength: {
                value: 20,
                message: "Comment must be less than 20 characters",
              },
            })}
            className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${
              errors.comment && "border border-red-600"
            }`}
            placeholder="Comment"
          />
          {errors.comment && (
            <div>
              <span className="text-sm text-red-600">
                {errors.comment.message}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="p-1 w-24 bg-blue-600 text-white rounded-md font-bold self-center"
        >
          Reply
        </button>
      </form>
    </Card>
  );
}
