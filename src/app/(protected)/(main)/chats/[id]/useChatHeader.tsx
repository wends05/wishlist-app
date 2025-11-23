"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useHomeHeader } from "@/providers/HomeHeaderProvider";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import ChatActions from "./ChatActions";

interface UseChatHeaderProps {
  title: string;
  wishId: Id<"wishes">;
  isDelivering: boolean
}

export default function useChatHeader({ title, wishId, isDelivering }: UseChatHeaderProps) {
  const { setContent } = useHomeHeader();

  useEffect(() => {
    setContent(
      <>
        <Link href="/chats">
          <ChevronLeft />
        </Link>
        <h3>{title}</h3>
        <ChatActions wishId={wishId} isDelivering={isDelivering} />
      </>
    );

    return () => {
      setContent(null);
    };
  }, [title, setContent, wishId, isDelivering]);
}
