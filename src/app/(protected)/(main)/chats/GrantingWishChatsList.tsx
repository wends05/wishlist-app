"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../../../convex/_generated/api";
import EmptyChatsList from "./EmptyChatsList";
import GrantingWishChatCard from "./GrantingWishChatCard";

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
        <EmptyChatsList description="No available conversations yet. Create a new conversations in your reserved wishes." />
      ) : (
        <ul className="grid grid-cols-3 gap-3">
          {grantingWishChats.map((chat) => (
            <GrantingWishChatCard key={chat._id} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
}
