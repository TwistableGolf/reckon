import { useAuth } from "@/components/protected-page";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { api } from "../../server/trpc/server";
import SubReckonPreview from "@/components/subrkn/subreckon-preview";

export default async function Home() {
  const authState = await useAuth();
  const subreckons = await api.subReckon.all();
  return (
    <main className="flex flex-col p-3 xl:mx-32 m-0 gap-4">
      {authState.authed && (
        <div className="flex justify-center">
          <Link href="/create">
            <MdAdd
              className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-full shadow-md text-white"
              size={48}
            ></MdAdd>
          </Link>
        </div>
      )}
      {subreckons.map((element, index) => {
        return <SubReckonPreview key={element.name} subReckon={element}></SubReckonPreview>;
      })}
    </main>
  );
}
