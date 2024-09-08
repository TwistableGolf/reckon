import { api } from "@/../server/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subReckon: string };
}) {
  let subReckon = await api.subReckon.byId(params.subReckon);

  if (subReckon == null) {
    return notFound();
  }

  return <div>{subReckon.name}</div>;
}
