import { SubReckon } from "@prisma/client";
import Card from "../card";
import Link from "next/link";

export default function SubReckonPreview({
  subReckon,
}: {
  subReckon: SubReckon;
}) {
  return (
    <Card>
      <Link
        href={`/rkn/${subReckon.name}`}
        className="text-xl"
      ><span>rkn/</span><span className="font-bold text-xl">{subReckon.name}</span></Link>
      <p>{subReckon.description}</p>
    </Card>
  );
}
