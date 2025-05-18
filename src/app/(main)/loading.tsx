"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Card className="px-1 py-4 mb-6">
        <CardContent className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-8 grow rounded-md" />
        </CardContent>
      </Card>
      <Card className="px-1 py-4 mb-6">
        <CardContent className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12" />
          ))}
        </CardContent>
      </Card>
    </>
  );
}
