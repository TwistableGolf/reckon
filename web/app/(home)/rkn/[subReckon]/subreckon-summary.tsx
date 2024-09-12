import Card from "@/components/card";
import { SubReckon } from "@prisma/client";
import Link from "next/link";
import { auth } from "../../../../auth";
import { api } from "../../../../server/trpc/server";

export default async function SubReckonSummary({
  subReckon,
}: {
  subReckon: SubReckon;
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
        className="font-bold text-xl"
      >{`rkn/${subReckon.name}`}</Link>
      <p>{subReckon.description}</p>
      <p>{0} subscribers</p>
      {authed ? (
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
