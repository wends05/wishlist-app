import type { FunctionReturnType } from "convex/server";
import { Blocks, User } from "lucide-react";
import Image from "next/image";
import type { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface WishItemProps {
  wish: FunctionReturnType<
    typeof api.wishes.findWishesOnHomePage
  >["page"][number];
}

export default function WishItem({ wish }: WishItemProps) {
  return (
    <Card className="h-full min-h-30 w-full max-w-sm">
      <CardHeader className="space-y-3">
        <div className="relative top-0 h-32 w-full space-y-3 overflow-hidden rounded-md bg-neutral-200">
          {wish.imageUrl && (
            <Image
              src={wish.imageUrl}
              alt={wish.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>
            <h4>{wish.name}</h4>
          </CardTitle>
          <div className="text-secondary *:flex *:items-center *:gap-2">
            <span>
              <Blocks size={16} />
              {wish.category.name}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex flex-col gap-2">
          <p>{wish.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-neutral-400">
          <User size={20} /> <p className="text-sm">{wish.owner.name}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
