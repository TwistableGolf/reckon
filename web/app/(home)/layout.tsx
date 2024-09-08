import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header doingOnboarding={false}></Header>
      <main>{children}</main>
    </>
  );
}
