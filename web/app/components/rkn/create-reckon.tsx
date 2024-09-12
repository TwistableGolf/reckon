"use client";
import Card from "@/components/card";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateReckonInput {
  title: string;
  content: string;
}
export default function CreateReckon({ name }: { name?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReckonInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<CreateReckonInput> = (data) => {

  };

  return (
    <Card className="p-6">
      <h1 className="font-bold">What do you reckon?</h1>
      <form
        className="mt-2 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="flex gap-x-1 items-center text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
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
        </div>

        <button
          type="submit"
          className="p-1 w-24 bg-blue-600 text-white rounded-md font-bold self-center"
        >
          Save
        </button>
      </form>
    </Card>
  );
}
