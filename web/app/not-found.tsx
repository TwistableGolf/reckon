import Link from "next/link";
import Header from "./components/header";

export default function NotFound() {
  return (
    <div className="h-screen">
      <Header doingOnboarding={false}></Header>
      <main className="flex justify-center items-center flex-col h-5/6 w-100">
        <div>Page does not exist</div>
        <Link href="/">Back to home</Link>
      </main>
    </div>
  );
}
