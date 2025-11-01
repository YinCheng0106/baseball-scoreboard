"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = Readonly<{
  title: string;
  description: string;
  imageSrc: string;
}>;

export function FunctionCard({ title, description, imageSrc }: Props) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
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
    </Card>
  );
}
