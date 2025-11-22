import type { OwningWishChatCard as OwningWishChatCardProps } from "@/types/Chat";
import { CardDescription, CardHeader, CardTitle } from "../card";
import { ChatComponent } from "./ChatComponent";

export default function OwningWishChatCard({
  chat,
}: {
  chat: OwningWishChatCardProps;
}) {
  return (
    <ChatComponent chat={chat}>
      <CardHeader>
        <CardTitle>{chat.wish.name}</CardTitle>
        <CardDescription>grantor: {chat.potentialGrantor}</CardDescription>
      </CardHeader>
      <ChatComponent.Actions />
    </ChatComponent>
  );
}
