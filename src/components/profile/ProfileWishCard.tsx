import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Card } from "../ui/card";

type WishCardStatus = Doc<"grants">["status"];

interface WishCardProps {
  wish: Doc<"wishes">;
  status: WishCardStatus;
  children: ReactNode;
}

const wishVariants = cva<{
  status: { [K in WishCardStatus]: string };
}>("flex flex-col gap-2", {
  variants: {
    status: {
      pending: "bg-gray-100",
      completed: "bg-green-100",
      cancelled: "bg-red-100",
    },
  },
});

export default function WishCard({ wish, status, children }: WishCardProps) {
  return <Card className={cn(wishVariants({ status }))}>{children}</Card>;
}
