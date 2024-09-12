import { CommentWithAuthor } from "@/types/db-types";
import Card from "../card";
import ProfileAvatar from "../profile-avatar";
import { MdReply } from "react-icons/md";
import { GoHeart, GoReply } from "react-icons/go";
import { CommentWithLevel } from "./comments";

export default function CommentTile({
  comment,
}: {
  comment: CommentWithLevel;
}) {
  return (
    <>
      <div style={{ marginLeft: comment.level + "rem" }}>
        <Card>
          <div className="flex gap-2">
            <div>
              <ProfileAvatar
                username={comment.author.name}
                size={48}
              ></ProfileAvatar>
            </div>
            <div className="flex flex-col flex-grow gap-4">
              <div className="flex flex-col gap-2">
                <p className="text font-semibold text-neutral-700 dark:text-gray-300">
                  {comment?.author.name}
                </p>
                <p className="text-sm text-neutral-700 dark:text-gray-300">
                  {comment?.content}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="shadow flex gap-1 items-center justify-center transition-colors dark:hover:bg-neutral-600 hover:bg-neutral-300  dark:bg-neutral-700 bg-neutral-200 rounded-md p-0.5">
                  <GoHeart className="mt-[2px]" size={20}></GoHeart>
                  <span>Like</span>
                </button>
                <button className="shadow flex gap-1 items-center justify-center transition-colors dark:hover:bg-neutral-600 hover:bg-neutral-300  dark:bg-neutral-700 bg-neutral-200 rounded-md p-0.5">
                  <GoReply size={20}></GoReply>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {comment.children.map((item, index)=>{
        return <CommentTile key={item.id} comment={item}></CommentTile>
      })}
    </>
  );
}
