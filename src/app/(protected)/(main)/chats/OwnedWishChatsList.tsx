"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import OwningWishChatCard from "@/components/ui/card/OwningWishChatCard";
import type { api } from "../../../../../convex/_generated/api";

interface OwnedWishChatsListProps {
  preloadedOwningWishChats: Preloaded<typeof api.chats.getOwningWishChats>;
}

export default function OwnedWishChatsList({
  preloadedOwningWishChats,
}: OwnedWishChatsListProps) {
  const ownedWishChats = usePreloadedQuery(preloadedOwningWishChats);
  return (
    <div>
      <h2>Owned Wish Chats</h2>
      <p>Chat with people who wants to grant your wish</p>
      {ownedWishChats.length === 0 ? (
        <p>No chats available.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-3">
          {ownedWishChats.map((chat) => (
            <OwningWishChatCard key={chat._id} chat={chat} />
          ))}
        </ul>
      )}
    </div>
  );
}
