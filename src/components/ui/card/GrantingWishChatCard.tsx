import type { GrantingWishChatCard as GrantingWishChatCardProps } from "@/types/Chat";
import { CardDescription, CardHeader, CardTitle } from "../card";
import { ChatComponent } from "./ChatComponent";

export default function GrantingWishChatCard({
  chat,
}: {
  chat: GrantingWishChatCardProps;
}) {
  return (
    <ChatComponent chat={chat}>
      <CardHeader>
        <CardTitle>{chat.wish.name}</CardTitle>
        <CardDescription>by: {chat.owner}</CardDescription>
      </CardHeader>
      <ChatComponent.Actions />
    </ChatComponent>
  );
}
