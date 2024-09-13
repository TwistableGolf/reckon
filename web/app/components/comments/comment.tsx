"use client";
import Card from "../card";
import ProfileAvatar from "../profile-avatar";
import { GoHeart, GoReply } from "react-icons/go";
import { CommentWithLevel } from "./comments";
import { useCallback, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import Reply from "./reply";

export default function CommentTile({
  comment,
  className,
  authed,
  replyPosted,
}: {
  comment: CommentWithLevel;
  className?: string;
  authed: boolean;
  replyPosted: () => void;
}) {
  const [expanded, setexpanded] = useState(false);

  const [showReply, setShowReply] = useState(false);

  const replyCallback = useCallback(() => {
    setexpanded(true);
    setShowReply(false);
    replyPosted();
  }, []);

  return (
    <>
      <div
        className={`flex flex-col gap-2 ${className}`}
        style={{ marginLeft: comment.level / 2 + "rem" }}
      >
        <Card>
          <div className="flex gap-2">
            {comment.children.length > 0 && (
              <button
                className="text-lg flex items-center justify-center transition-colors dark:hover:bg-neutral-600 hover:bg-neutral-300  dark:bg-neutral-700 bg-neutral-200 rounded-md"
                onClick={() => setexpanded(!expanded)}
              >
                {expanded ? (
                  <MdRemove size={16}></MdRemove>
                ) : (
                  <MdAdd size={16}></MdAdd>
                )}
              </button>
            )}

            <div>
              <ProfileAvatar
                username={comment.author.name}
                size={38}
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
              {authed && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => e.stopPropagation}
                    className="shadow flex gap-1 items-center justify-center transition-colors dark:hover:bg-neutral-600 hover:bg-neutral-300  dark:bg-neutral-700 bg-neutral-200 rounded-md p-0.5"
                  >
                    <GoHeart className="mt-[2px]" size={20}></GoHeart>
                    <span>Like</span>
                  </button>

                  <button
                    onClick={() => setShowReply(!showReply)}
                    className="shadow flex gap-1 items-center justify-center transition-colors dark:hover:bg-neutral-600 hover:bg-neutral-300  dark:bg-neutral-700 bg-neutral-200 rounded-md p-0.5"
                  >
                    <GoReply size={20}></GoReply>
                    <span>Reply</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {showReply && authed && (
            <Reply
              postId={comment.postId}
              parentComment={comment}
              onPosted={replyCallback}
            ></Reply>
          )}
          {expanded &&
            comment.children.map((item, index) => {
              return (
                <CommentTile
                  className={!expanded ? "hidden" : ""}
                  key={item.id}
                  comment={item}
                  authed={authed}
                  replyPosted={replyCallback}
                ></CommentTile>
              );
            })}
        </Card>
      </div>
    </>
  );
}
