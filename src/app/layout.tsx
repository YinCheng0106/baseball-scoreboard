import type { Metadata } from "next";
import { AppHeader } from "@/components/app/header";
import { AppFooter } from "@/components/app/footer";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baseball Scoreboard",
  description:
    "A simple baseball scoreboard application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <div className="flex min-h-svh flex-col">
              <AppHeader />
              <main className="flex w-full flex-col items-center">
                {children}
              </main>
            </div>
            <AppFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
