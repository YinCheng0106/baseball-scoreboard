"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { RootProvider } from "fumadocs-ui/provider/next";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocs = pathname === "/docs" || pathname?.startsWith("/docs/");

  if (isDocs) {
    return (
      <div className="flex flex-col">
        <div className="flex min-h-svh flex-col">
          <main className="flex w-full flex-col items-center">
            <RootProvider>{children}</RootProvider>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex min-h-svh flex-col">
        <AppHeader />
        <main className="flex w-full flex-col items-center">
          <RootProvider>{children}</RootProvider>
        </main>
      </div>
      <AppFooter />
    </div>
  );
}
