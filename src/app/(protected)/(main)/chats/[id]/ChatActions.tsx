"use client";
import { useMutation } from "convex/react";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

interface ChatActionsProps {
  wishId: Id<"wishes">;
  isDelivering: boolean;
}

export default function ChatActions({
  wishId,
  isDelivering,
}: ChatActionsProps) {
  const setWishStatus = useMutation(api.wishes.setWishStatus);
  const setWishToDelivering = async () => {
    try {
      await setWishStatus({ wishId, status: "delivering" });
    } catch (error) {
      toast.error("Failed to set wish to delivering");
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/wish/${wishId}`}>Wish Details</Link>
        </DropdownMenuItem>
        {!isDelivering && (
          <DropdownMenuItem onClick={setWishToDelivering}>
            Set To Delivering
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
