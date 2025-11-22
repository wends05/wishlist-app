import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  otherPersonName?: string;
}

export default function ChatHeader({ otherPersonName }: ChatHeaderProps) {
  return (
    <div className="fixed flex w-full gap-3 px-8 py-1">
      <Link href={"/chats"}>
        <Button variant={"ghost"} size={"icon"}>
          <ChevronLeft />
        </Button>
      </Link>
      <h3>{otherPersonName ? otherPersonName : "Loading..."}</h3>
    </div>
  );
}
