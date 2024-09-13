"use client";
import Card from "@/components/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "@/_trpc/client";
import { CommentWithAuthor } from "@/types/db-types";
import { MdArrowForward } from "react-icons/md";

interface CommentForm {
  comment: string;
}
export default function Reply({
  postId,
  parentComment,
  onPosted,
}: {
  postId: string;
  parentComment?: CommentWithAuthor;
  onPosted: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CommentForm>({ mode: "onChange" });

  const mutation = trpc.comment.postComment.useMutation();

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    if (mutation.isPending) return;
    mutation.mutate(
      {
        comment: data.comment,
        postId,
        parentCommentId: parentComment?.id,
      },
      {
        onSuccess: () => {
          setValue("comment", "");
          onPosted();
        },
      }
    );
  };

  return (
    <Card>
      <form className="flex gap-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-grow">
          <input
            {...register("comment", {
              required: "Comment is required",
              maxLength: {
                value: 8192,
                message: "Comment must be less than 8192 characters",
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
          className="p-1 w-10 flex justify-center  bg-blue-600 text-white rounded-md font-bold self-end"
        >
          <MdArrowForward></MdArrowForward>
        </button>
      </form>
    </Card>
  );
}
