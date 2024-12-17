"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div
        className="rounded-lg flex justify-center items-center p-4 px-6 cursor-pointer text-white bg-blue-500"
        onClick={() => navigate.push("/tasks")}
      >
        Tasks Page
      </div>
    </div>
  );
}
