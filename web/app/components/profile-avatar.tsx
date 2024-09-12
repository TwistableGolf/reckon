import Image from "next/image";
import Link from "next/link";

export default function ProfileAvatar({
  username,
  size,
}: {
  username?: string | null;
  size: number;
}) {
  return (
    <Link href={`/user/${username}`}>
      <Image
        className="rounded-md"
        src={`https://api.dicebear.com/9.x/shapes/svg?seed=${username}`}
        alt="profile-avatar"
        width={size}
        height={size}
      ></Image>
    </Link>
  );
}
