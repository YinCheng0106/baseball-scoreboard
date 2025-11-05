"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = Readonly<{
  title: string;
  description: string;
  imageSrc: string;
  linkHref?: string;
}>;

export function ScoreBoardCard({
  title,
  description,
  imageSrc,
  linkHref,
}: Props) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
      {imageSrc === "" ? null : (
        <CardContent>
          <div className="bg-accent/40 overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={title}
              width={800}
              height={450}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        </CardContent>
      )}
      {linkHref ? (
        <CardFooter>
          <Link href={linkHref} className="text-primary hover:underline">
            <Button className="cursor-pointer">了解更多 &rarr;</Button>
          </Link>
        </CardFooter>
      ) : null}
    </Card>
  );
}
