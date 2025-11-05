"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 select-none">
      <h2 className="text-8xl">404</h2>
      <p className={`text-center text-base text-gray-500 sm:text-lg`}>未知</p>
      <Button>
        <Link href="/">返回首頁</Link>
      </Button>
    </div>
  );
}
