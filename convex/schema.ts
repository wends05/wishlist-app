import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
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
