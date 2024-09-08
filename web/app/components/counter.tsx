"use client";
import { useBearStore } from "@/state/store";

export default function Counter() {
  const bears = useBearStore((state) => state.bears);
  const increaseBears = useBearStore((state) => state.increase);
  return (
    <>
      <h1>{bears}</h1>
      <button onClick={()=>increaseBears(1)}>Add</button>
    </>
  );
}
