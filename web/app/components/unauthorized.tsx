import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col gap-2">
      <div>You must be logged in to view this page</div>
      <Link href="javascript:history.back()">Back</Link>
    </div>
  );
}
