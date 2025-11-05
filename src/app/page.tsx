"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FunctionCard } from "@/components/app/functionCard";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl sm:max-w-4xl lg:max-w-6xl">
          <div className="flex flex-col items-center gap-6 sm:items-start sm:gap-8">
            <h1 className="text-4xl font-black tracking-tight text-balance text-zinc-900 sm:text-6xl lg:text-7xl dark:text-zinc-100">
              棒球記分板
            </h1>
            <p className="max-w-prose text-center text-base text-zinc-600 sm:text-left sm:text-lg dark:text-zinc-400">
              讓您輕鬆記錄比賽過程中的每一個精彩瞬間！
            </p>
            <div className="w-full sm:w-auto">
              <Link href="/scoreboard">
                <Button
                  className={`w-full cursor-pointer rounded-2xl px-6 py-6 text-base sm:w-auto sm:text-lg`}
                >
                  開始使用
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
            功能介紹
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            <FunctionCard
              title="即時記錄"
              description="隨時記錄比賽中的每一個精彩瞬間，讓您不再錯過任何細節"
              imageSrc="/globe.svg"
            />
            <FunctionCard
              title="隊伍與球員管理"
              description="快速建立隊伍與球員名單，支援比賽前後設定與變更"
              imageSrc="/window.svg"
            />
            <FunctionCard
              title="統計與匯出"
              description="比賽結束後自動彙整數據，支援表格與圖片匯出分享"
              imageSrc="/file.svg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
