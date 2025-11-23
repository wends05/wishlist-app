"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useHomeHeader } from "@/providers/HomeHeaderProvider";

interface UseChatHeaderProps {
  title: string;
}

export default function useChatHeader({ title }: UseChatHeaderProps) {
  const { setContent } = useHomeHeader();

  useEffect(() => {
    setContent(
      <>
        <Link href="/chats">
          <ChevronLeft />
        </Link>
        <h3>{title}</h3>
      </>
    );

    return () => {
      setContent(null);
    };
  }, [title, setContent]);
}
