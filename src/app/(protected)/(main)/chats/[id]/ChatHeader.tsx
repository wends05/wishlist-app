import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import WishDetailsButton from "./WishDetailsButton";

interface ChatHeaderProps {
  otherPersonName?: string;
  wishId: Id<"wishes">;
}

export default function ChatHeader({
  otherPersonName,
  wishId,
}: ChatHeaderProps) {
  return (
    <div className="-z-1 fixed flex w-full items-center gap-3 px-12 py-2">
      <Link href={"/chats"}>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronLeft />
        </Button>
      </Link>
      <h3>{otherPersonName ? otherPersonName : "Loading..."}</h3>

      <WishDetailsButton wishId={wishId} />
    </div>
  );
}
