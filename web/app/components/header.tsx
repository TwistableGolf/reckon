import Image from "next/image";
import { auth } from "@/../auth";
import { SignIn, SignOut } from "./signin-button";
import ThemeSwitcher from "./theme-switcher";

export default async function Header() {
  let session = await auth();
  return (
    <header className="flex sticky top-0 shadow text-lg gap-x-4 p-3 dark:bg-neutral-800 bg-neutral-100 rounded-b-lg">
      <Image
        src="/reckon-light.png"
        alt="logo"
        width={20}
        height={20}
        className="w-auto"
      ></Image>
            <ThemeSwitcher></ThemeSwitcher>

      {session != null ? (
        <div className="flex grow gap-x-2 items-center justify-between">
          <h1 className="align-middle">{session?.user?.name} </h1>
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
