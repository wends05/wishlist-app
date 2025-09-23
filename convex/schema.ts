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
  }).index("email", ["email"]),
  wish: defineTable({
    name: v.string(),
    description: v.string(),
    amount: v.number(),
    imageUrl: v.string(),
    owner: v.id("users"),
    updatedAt: v.number(),
  }),
  grants: defineTable({
    wish: v.id("wishes"),
    grantor: v.id("users"),
    amount: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed")),
    paymentMethod: v.string(),
    updatedAt: v.number(),
  }),
});
