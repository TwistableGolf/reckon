"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../card";
import { MdClose } from "react-icons/md";

export default function Modal({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) {
  let router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loaded) return;
    e.stopPropagation();
    setLoaded(false);
    setTimeout(() => {
      router.back();
    }, 500);
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className={`fixed inset-0 flex justify-center items-center `}>
      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 bg-black transition duration-500 ease-out -z-10 ${
          loaded ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <div
        className={`transition duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Card>
          <div
            onClick={handleContentClick}
            className={`border-b pb-1 mb-1 flex justify-between items-center `}
          >
            <div>{title}</div>
            <button onClick={router.back}>
              <MdClose size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-y-2 ">{children}</div>
        </Card>
      </div>
    </div>
  );
}
