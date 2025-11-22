"use server";

import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export const sendMessage = async (chatId: Id<"chats">, content: string) =>
  await fetchMutation(
    api.messages.sendMessage,
    {
      chatId,
      content,
    },
    {
      token: await convexAuthNextjsToken(),
    }
  );
