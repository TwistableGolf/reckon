import Image from "next/image";
import { auth } from "@/../auth";
import { SignIn, SignOut } from "./signin-button";
import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";
import { api } from "../../server/trpc/server";
import { redirect } from "next/navigation";

interface UserSnippet {
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | undefined;
}

export default async function Header({
  doingOnboarding,
}: {
  doingOnboarding: boolean;
}) {
  const session = await auth();
  let user: UserSnippet | null | undefined;
  if (session) {
    user = await api.user.snippetBySession();
    if (user == null && !doingOnboarding) {
      return redirect("/onboarding");
    }
  }

  if (doingOnboarding && user == null) {
    user = session?.user;
  }

  return (
    <header className="flex sticky top-0 shadow text-lg gap-x-4 p-3 dark:bg-neutral-800 bg-neutral-100 rounded-b-lg">
      <Link href="/">
        <Image
          src="/reckon-light.png"
          alt="logo"
          width={20}
          height={20}
          className="w-auto"
        ></Image>
      </Link>
      <ThemeSwitcher></ThemeSwitcher>

      {user != null ? (
        <div className="flex grow gap-x-2 items-center justify-end">
          {doingOnboarding ? (
            <div></div>
          ) : (
            <>
              <h1 className="align-middle">{user?.name} </h1>
              <div className="bg-neutral-400 h-4 w-0.5"></div>
            </>
          )}
          <div className="flex gap-4">
            <SignOut></SignOut>
          </div>
        </div>
      ) : (
        <div className="flex grow gap-x-2 justify-end">
          <SignIn></SignIn>
        </div>
      )}
    </header>
  );
}
