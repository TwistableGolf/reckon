"use client";
import Card from "@/components/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tooltip } from "../components/Tooltip";
import { trpc } from "@/_trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface OnboardingFormInput {
  userName: string;
}
export default function OnboardingForm({ name }: { name?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormInput>({ mode: "onChange" });
  const router = useRouter();
  const mutation = trpc.user.username.useMutation();

  const onSubmit: SubmitHandler<OnboardingFormInput> = (data) => {
    mutation.mutate({ username: data.userName });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/");
    } else {
      console.log(mutation.error);
    }
  }, [mutation]);

  return (
    <Card className="p-6">
      <p className="leading-none">Hi {name}!</p>
      <p className="leading-none">
        We need a few extra details to get you set up
      </p>
      <form
        className="mt-2 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="flex gap-x-1 items-center text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username <Tooltip tooltip="This is a username field"></Tooltip>
          </label>
          <input
            {...register("userName", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Username must be less than 20 characters",
              },
            })}
            className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${
              errors.userName && "border border-red-600"
            }`}
            placeholder="Username"
          />
          {errors.userName && (
            <div>
              <span className="text-sm text-red-600">
                {errors.userName.message}
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
