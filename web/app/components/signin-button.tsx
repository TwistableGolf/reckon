import { signIn, signOut } from "@/../auth";
import Image from "next/image";
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button className="flex gap-2 items-center" type="submit">
        Sign in with GitHub

          <Image
            className="dark:hidden"
            src="github/github-mark.svg"
            alt="Github logo"
            width={20}
            height={20}
          ></Image>
          <Image
            className="dark:block hidden"
            src="github/github-mark-white.svg"
            alt="Github logo"
            width={20}
            height={20}
          ></Image>
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Signout</button>
    </form>
  );
}
