import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Doc } from "../../../convex/_generated/dataModel";
import Image from "next/image";

interface WishItemProps {
  wish: Doc<"wish">;
}

export default function WishItem({ wish }: WishItemProps) {
  return (
    <Card>
      <CardContent>
        <div className="relative h-1/2">
          <Image
            src={wish.imageUrl || "/placeholder.svg"}
            alt={wish.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>{wish.description}</p>
          <p>{wish.amount}</p>
          <p>{wish.owner}</p>
          <p>{wish.updatedAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}
