import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";
import ChatPage from "./ChatPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = await convexAuthNextjsToken();

  const preloadedChat = await preloadQuery(
    api.chats.getChatPageDetails,
    { chatId: id as Id<"chats"> },
    { token }
  );

  return <ChatPage preloadedChat={preloadedChat} />;
}
