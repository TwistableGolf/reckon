import { redirect } from "next/navigation";
import { auth } from "../../auth";
import OnboardingForm from "./onboarding-form";
import { api } from "../../server/trpc/server";


export default async function Page() {
  

  let session = await auth();
  if (!session) {
    redirect("/");
  }

  if(await api.user.snippetBySession())
  {
    redirect("/");
  }

  return (
    <OnboardingForm name={session.user?.name?.split(' ')[0]}></OnboardingForm>
  );
}
