"use client";

import Link from "next/link";

export function AppFooter() {
  return (
    <div>
      <footer className="border-t pt-4 pb-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} <Link href="https://github.com/yincheng0106" target="_blank" className="link">YinCheng</Link>. All rights reserved.
      </footer>
    </div>
  )
}