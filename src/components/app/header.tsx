"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/app/themeSwitch";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function AppHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-2">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold">棒球記分板</h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                計分版
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                        href="/scoreboard"
                      >
                        <div className="mb-2 text-lg font-medium sm:mt-4">
                          開始使用
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          快速上手，立即體驗棒球記分板的強大功能！
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="文檔">
                    詳細介紹了如何使用和自定義棒球記分板應用程式
                  </ListItem>
                  <ListItem href="/docs" title="常見問題">
                    解答您在使用過程中可能遇到的常見問題
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
