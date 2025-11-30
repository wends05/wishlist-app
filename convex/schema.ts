import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    address: v.optional(v.string()),
  }).index("email", ["email"]),
  wishes: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.id("categories"),
    imageUrl: v.optional(v.string()),
    owner: v.id("users"),
    updatedAt: v.number(),
    grantor: v.optional(v.id("users")),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("delivering"),
        v.literal("completed"),
        v.literal("cancelled")
      )
    ),
    imageId: v.optional(v.id("_storage")),
  })
    .index("by_owner", ["owner"])
    .index("by_grantor_status", ["grantor", "status"])
    .index("home", ["status", "updatedAt"]),
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    updatedAt: v.number(),
  }).index("by_name", ["name"]),
  chats: defineTable({
    potentialGrantor: v.id("users"),
    owner: v.id("users"),
    wish: v.id("wishes"),
    createdAt: v.number(),
  })
    .index("by_wish_and_potentialGrantor", ["wish", "potentialGrantor"])
    .index("by_potentialGrantor", ["potentialGrantor"])
    .index("by_owner", ["owner"])
    .index("by_wish", ["wish"]),
  messages: defineTable({
    chat: v.id("chats"),
    sender: v.id("users"),
    content: v.string(),
    isSystemMessage: v.boolean(),
    createdAt: v.number(),
  }).index("by_chat_createdAt", ["chat", "createdAt"]),
  notifications: defineTable({
    recipient: v.id("users"),
    content: v.string(),
    link: v.string(),
    isRead: v.boolean(),
  }).index("by_recipient_isRead", ["recipient", "isRead"]),
});
