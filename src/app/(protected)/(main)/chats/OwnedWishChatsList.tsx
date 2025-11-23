"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../../../convex/_generated/api";
import EmptyChatsList from "./EmptyChatsList";
import OwnedWishChatCard from "./OwnedWishChatCard";

interface OwnedWishChatsListProps {
  preloadedOwnedWishChats: Preloaded<typeof api.chats.getOwnedWishChats>;
}

export default function OwnedWishChatsList({
  preloadedOwnedWishChats,
}: OwnedWishChatsListProps) {
  const ownedWishChats = usePreloadedQuery(preloadedOwnedWishChats);
  return (
    <div>
      <h2>Owned Wish Chats</h2>
      <p>Chat with people who wants to grant your wish</p>
      {ownedWishChats.length === 0 ? (
        <EmptyChatsList description="No available chats available. Please wait for a grantor to start a conversation." />
      ) : (
        <ul className="grid grid-cols-3 gap-3">
          {ownedWishChats.map((chat) => (
            <OwnedWishChatCard key={chat._id} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
}
