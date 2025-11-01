"use client";

export function AppFooter() {
  return (
    <div>
      <footer className="border-t pt-4 pb-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} YinCheng. All rights reserved.
      </footer>
    </div>
  )
}