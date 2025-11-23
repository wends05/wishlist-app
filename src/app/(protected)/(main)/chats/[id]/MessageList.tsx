"use client";
import type { Doc } from "@convex-dev/auth/server";
import type { FunctionReturnType } from "convex/server";
import { useLayoutEffect, useRef, useState } from "react";
import type { Chat } from "@/types/Chat";
import type { api } from "../../../../../../convex/_generated/api";
import Message from "./Message";

interface ChatContentProps {
  messages: FunctionReturnType<typeof api.messages.getChatMessages>["page"];
  chat: Chat;
  user: Doc<"users">;
  loadMore: (numItems: number) => void;
  status: "CanLoadMore" | "LoadingMore" | "Exhausted";
}

export default function MessageList({
  messages,
  user,
  loadMore,
  status,
}: ChatContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const prevScrollHeightRef = useRef<number>(0);
  const prevMessagesLengthRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      if (isFirstLoad) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        setIsFirstLoad(false);
      } else {
        const scrollHeight = scrollRef.current.scrollHeight;
        const countDifference = messages.length - prevMessagesLengthRef.current;

        // If we loaded more messages (added to top) and we were near the top
        if (countDifference > 0 && scrollRef.current.scrollTop < 50) {
          scrollRef.current.scrollTop =
            scrollHeight - prevScrollHeightRef.current;
        }
      }
      prevScrollHeightRef.current = scrollRef.current.scrollHeight;
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages, isFirstLoad]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop } = scrollRef.current;
      if (scrollTop === 0 && status === "CanLoadMore") {
        loadMore(20);
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col overflow-y-auto p-4"
      onScroll={handleScroll}
    >
      <ul className="flex min-h-full flex-col justify-end gap-2">
        <div className="h-20" />
        {[...messages].reverse().map((message) => (
          <Message
            timestamp={message.timestamp}
            key={message._id}
            content={message.content}
            type={
              message.isSystemMessage
                ? "system"
                : message.sender.id === user?._id
                  ? "user"
                  : "other"
            }
          />
        ))}
        <div className="h-20" />
      </ul>
    </div>
  );
}
