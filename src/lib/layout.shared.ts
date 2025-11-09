import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Baseball Scoreboard",
      url: "/docs",
      transparentMode: "top",
    },
    links: [
      {
        type: "main",
        text: "Home",
        url: "/",
      },
    ],
    githubUrl: "https://github.com/YinCheng0106/baseball-scoreboard"
  };
}
