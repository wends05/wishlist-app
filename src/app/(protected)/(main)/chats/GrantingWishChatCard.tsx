import ConfirmCancel from "@/app/(protected)/(main)/reserved/ConfirmCancel";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GrantingWishChatCard as GrantingWishChatCardProps } from "@/types/Chat";
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
        <CardDescription>by: {chat.owner.name}</CardDescription>
      </CardHeader>
      <ChatComponent.Actions>
        {typeof chat.wish === "string" ? (
          <ConfirmCancel wishId={chat.wish} />
        ) : (
          <ConfirmCancel wishId={chat.wish._id} />
        )}
      </ChatComponent.Actions>
    </ChatComponent>
  );
}
