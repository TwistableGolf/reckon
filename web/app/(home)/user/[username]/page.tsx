export default async function Page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: {};
}) {
  return (<>
    <h1>Profile for {params.username}</h1>
  </>);
}
