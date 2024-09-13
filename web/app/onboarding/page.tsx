import { redirect } from "next/navigation";
import { auth } from "../../auth";
import OnboardingForm from "./onboarding-form";
import { api } from "../../server/trpc/server";

export default async function Page() {
  let session = await auth();
  if (!session) {
    redirect("/");
  }
  try{
    if (await api.user.snippetBySession()) {
      redirect("/");
    }
  }catch{
    //Ignore, not onboarded
  }


  return (
    <div className="flex flex-col items-center justify-center m-6">
      <OnboardingForm name={session.user?.name?.split(" ")[0]}></OnboardingForm>
    </div>
  );
}
