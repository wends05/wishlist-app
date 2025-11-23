import type { FunctionReturnType } from "convex/server";
import type { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export type BaseChat = Doc<"chats">;

export type GrantingWishChatCard = FunctionReturnType<
  typeof api.chats.getGrantingWishChats
>[number];

export type OwnedWishChatCard = FunctionReturnType<
  typeof api.chats.getOwnedWishChats
>[number];

export type Chat = BaseChat | GrantingWishChatCard | OwnedWishChatCard;
