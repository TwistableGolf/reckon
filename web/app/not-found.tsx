import Link from "next/link";
import Header from "./components/header";

export default function NotFound() {
  return (
    <div className="h-screen">
      <Header doingOnboarding={false}></Header>
      <main className="flex justify-center items-center flex-col h-5/6 w-100 gap-2">
        <div>Page does not exist</div>
        
        <Link href={`/`} className="font-bold text-white text-center bg-blue-600 rounded-md p-1">Back to home</Link>
      </main>
    </div>
  );
}
