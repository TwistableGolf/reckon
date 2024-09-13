import { useAuth } from "@/components/protected-page";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default async function Home() {
  const authState = await useAuth();
  if (authState.authed) {
    return (
      <main className="flex h-1/2 flex-col justify-center items-center">
        <Link href="/create">
          <MdAdd
            className="bg-blue-600 rounded-full shadow-md text-white"
            size={48}
          ></MdAdd>
        </Link>
      </main>
    );
  } else {
    return <></>;
  }
}