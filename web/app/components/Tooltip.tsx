"use client";
import { MdInfo } from "react-icons/md";

export function Tooltip({ tooltip }: { tooltip: string; }) {
  return (
    <div className="group w-max relative">
      <MdInfo className="cursor-pointer"></MdInfo>
      <span className="pointer-events-none shadow bg-white dark:bg-neutral-900 p-1 px-2 -translate-x-1/2 rounded-md select-none absolute -top-9 left-2 w-max opacity-0 transition-opacity group-hover:opacity-100">
        {tooltip}
      </span>
    </div>
  );
}
