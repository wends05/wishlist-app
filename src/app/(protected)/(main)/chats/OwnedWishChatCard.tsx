import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { OwnedWishChatCard as OwnedWishChatCardProps } from "@/types/Chat";
import { ChatComponent } from "./ChatComponent";

export default function OwnedWishChatCard({
  chat,
}: {
  chat: OwnedWishChatCardProps;
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
