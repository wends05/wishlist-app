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
  }).index("by_email", ["email"]),
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
        v.literal("completed"),
        v.literal("cancelled"),
      ),
    ),
  })
    .index("by_owner", ["owner"])
    .index("by_grantor_status", ["grantor", "status"]),
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    updatedAt: v.number(),
  }).index("by_name", ["name"]),
});
