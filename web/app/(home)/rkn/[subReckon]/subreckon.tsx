"use client";

import { SubReckon } from "@prisma/client";

export default function SubRkn({ subReckon }: { subReckon: SubReckon }) {
  return <div>{subReckon.name}</div>;
}
