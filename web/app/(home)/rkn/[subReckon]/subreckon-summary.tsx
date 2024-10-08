import Card from "@/components/card";
import { SubReckon } from "@prisma/client";
import Link from "next/link";
import { auth } from "../../../../auth";
import { api } from "../../../../server/trpc/server";

export default async function SubReckonSummary({
  subReckon,
  onHome
}: {
  subReckon: SubReckon;
  onHome: boolean;
}) {
  var session = await auth();
  let authed = false;
  if (session) {
    authed = (await api.user.snippetBySession()) != null;
  }

  return (
    <Card>
      <Link
        href={`/rkn/${subReckon.name}`}
        className="text-xl border-b border-black dark:border-neutral-500"
      ><span>rkn/</span><span className="font-bold text-xl">{subReckon.name}</span></Link>
      <p>{subReckon.description}</p>
      <p>{0} subscribers</p>
      {authed && onHome ? (
        <Link
          href={`/rkn/${subReckon.name}/new-post`}
          className="font-bold text-white text-center bg-blue-600 rounded-md"
        >
          Post Reckon
        </Link>
      ) : (
        <></>
      )}
    </Card>
  );
}
