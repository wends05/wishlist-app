"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useHomeHeader } from "@/providers/HomeHeaderProvider";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import WishDetailsButton from "./WishDetailsButton";

interface UseChatHeaderProps {
  title: string;
  wishId: Id<"wishes">;
}

export default function useChatHeader({ title, wishId }: UseChatHeaderProps) {
  const { setContent } = useHomeHeader();

  useEffect(() => {
    setContent(
      <>
        <Link href="/chats">
          <ChevronLeft />
        </Link>
        <h3>{title}</h3>
        <WishDetailsButton wishId={wishId} />
      </>
    );

    return () => {
      setContent(null);
    };
  }, [title, setContent, wishId]);
}
