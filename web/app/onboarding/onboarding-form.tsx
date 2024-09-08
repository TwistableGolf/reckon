"use client";
import Card from "@/components/card";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdInfo } from "react-icons/md";

interface OnboardingFormInput {
  userName: string;
}
function Tooltip({ tooltip }: { tooltip: string }) {
  return (
    <div className="group w-max relative">
      <MdInfo className="cursor-pointer"></MdInfo>
      <span className="pointer-events-none shadow bg-white dark:bg-neutral-900 p-1 px-2 -translate-x-1/2 rounded-md select-none absolute -top-9 left-2 w-max opacity-0 transition-opacity group-hover:opacity-100">
        This is a username field
      </span>
    </div>
  );
}

export default function OnboardingForm({ name }: { name?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OnboardingFormInput>({ mode: "onChange" });
  const onSubmit: SubmitHandler<OnboardingFormInput> = (data) =>
    console.log(data);


  return (
    <div className="flex flex-col items-center justify-center m-10">
      <Card className="p-6">
        <p className="leading-none">Hi {name}!</p>
        <p className="leading-none">
          We need a few extra details to get you set up
        </p>
        <form
          className="mt-2 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="flex gap-x-1 items-center text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username{" "}
              <Tooltip tooltip="This is a username field"></Tooltip>
            </label>
            <input
              {...register("userName", { required: "Username is required", maxLength: {
                value: 20,
                message: "Max length 20"
              } })}
              className={`shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  ${errors.userName && "border border-red-600"}`}
              placeholder="Username"
            />
            {errors.userName && (
              <div>
                <span className="text-sm text-red-600">{errors.userName.message}</span>
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
    </div>
  );
}
