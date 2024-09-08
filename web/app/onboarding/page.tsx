import { redirect } from "next/navigation";
import { auth } from "../../auth";
import Card from "@/components/card";
import { MdInfo } from "react-icons/md";

import { useSession } from "next-auth/react";
import OnboardingForm from "./onboarding-form";


export default async function Page() {
  

  let session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <OnboardingForm name={session.user?.name?.split(' ')[0]}></OnboardingForm>
  );
}
