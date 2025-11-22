"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import GrantingWishCard from "@/components/ui/chat/GrantingWishChatCard";
import type { api } from "../../../../../convex/_generated/api";

interface GrantingWishChatsListProps {
  preloadedGrantingWishChats: Preloaded<typeof api.chats.getGrantingWishChats>;
}

export default function GrantingWishChatsList({
  preloadedGrantingWishChats,
}: GrantingWishChatsListProps) {
  const grantingWishChats = usePreloadedQuery(preloadedGrantingWishChats);
  return (
    <div>
      <h2>Granting Wish Chats</h2>
      <p>Chat with people to converse about their wishes</p>
      {grantingWishChats.length === 0 ? (
        <p>No chats available.</p>
      ) : (
        <ul className="flex gap-3 overflow-x-auto">
          {grantingWishChats.map((chat) => (
            <GrantingWishCard key={chat._id} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
}
