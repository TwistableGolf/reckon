"use client";
import Card from "@/components/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip } from "@/components/Tooltip";
import { trpc } from "@/_trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CreateSubreckonForm {
  subReckonName: string;
}
export default function CreateSubreckonForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateSubreckonForm
>({ mode: "onChange" });
  const router = useRouter();
  const mutation = trpc.subReckon.createSubReckon.useMutation();

  const onSubmit: SubmitHandler<CreateSubreckonForm
> = (data) => {
    mutation.mutate(data.subReckonName);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/rkn/"+getValues().subReckonName);
    } else {
      console.log(mutation.error);
    }
  }, [mutation]);

  return (
    <Card className="p-6">
      <p className="leading-none">
        Create a SubReckon
      </p>
      <form
        className="mt-2 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="flex gap-x-1 items-center text-sm font-bold mb-2"
            htmlFor="subReckonName"
          >
            Subreckon name <Tooltip tooltip="This is a Subreckon name field"></Tooltip>
          </label>
          <input
            {...register("subReckonName", {
              required: "Subreckon name is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Subreckon name can only contain letters and numbers"
              },
              maxLength: {
                value: 20,
                message: "Subreckon name must be less than 20 characters",
              },
            })}
            className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${
              errors.subReckonName && "border border-red-600"
            }`}
            placeholder="Subreckon name"
          />
          {errors.subReckonName && (
            <div>
              <span className="text-sm text-red-600">
                {errors.subReckonName.message}
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
