import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ConfirmCancel from "@/app/(protected)/(main)/reserved/ConfirmCancel";
import { cn } from "@/lib/utils";
import type { Chat } from "@/types/Chat";
import { Button } from "../button";
import { Card, CardFooter } from "../card";

interface ChatItemContextValue {
  chat: Chat;
}

const ChatItemContext = React.createContext<ChatItemContextValue | null>(null);

const useChatItem = () => {
  const context = React.useContext(ChatItemContext);
  if (!context) {
    throw new Error(
      "ChatItem compound components must be used within ChatItem"
    );
  }
  return context;
};

interface ChatComponentRootProps {
  chat: Chat;
  children: React.ReactNode;
  className?: string;
}

function ChatComponentRoot({
  chat,
  children,
  className,
}: ChatComponentRootProps) {
  return (
    <ChatItemContext.Provider value={{ chat }}>
      <Card className={cn("w-full", className)}>{children}</Card>
    </ChatItemContext.Provider>
  );
}

interface ChatActionsProps {
  children?: React.ReactNode;
}

function ChatActions({ children }: ChatActionsProps) {
  const { chat } = useChatItem();

  return (
    <CardFooter className="flex justify-end gap-2 pt-4">
      {children}
      <Link href={`/chats/${chat._id}`}>
        <Button>
          <ChevronRight />
        </Button>
      </Link>
    </CardFooter>
  );
}

export const ChatComponent = Object.assign(ChatComponentRoot, {
  Actions: ChatActions,
});
