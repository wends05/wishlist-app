"use client";

import {
  type Preloaded,
  usePaginatedQuery,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { Spinner } from "@/components/ui/spinner";
import { api } from "../../../../../../convex/_generated/api";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import SendMessageComponent from "./SendMessageComponent";

interface ChatPageProps {
  preloadedChat: Preloaded<typeof api.chats.getChatPageDetails>;
}

export default function ChatPage({ preloadedChat }: ChatPageProps) {
  const user = useQuery(api.users.getCurrentUserDataHandler);
  const chat = usePreloadedQuery(preloadedChat);

  const {
    results: messages,
    isLoading,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.messages.getChatMessages,
    {
      chatId: chat._id,
    },
    { initialNumItems: 20 }
  );

  if (!user || isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!chat.ownerName || !chat.potentialGrantorName) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Chat not found.</p>
      </div>
    );
  }
  const otherPersonName =
    user._id === chat.owner ? chat.potentialGrantorName : chat.ownerName;

  return (
    <>
      <ChatHeader otherPersonName={otherPersonName} />
      <div className="flex h-full flex-col items-center space-y-3">
        <div className="flex min-h-0 w-full max-w-3xl flex-1 flex-col">
          <MessageList
            messages={messages}
            chat={chat}
            user={user}
            loadMore={loadMore}
            status={status}
          />
        </div>
        <SendMessageComponent chatId={chat._id} />
      </div>
    </>
  );
}
