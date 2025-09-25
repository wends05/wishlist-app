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
  wishes: defineTable({
    name: v.string(),
    description: v.string(),
    quantity: v.number(),
    category: v.id("categories"),
    imageUrl: v.optional(v.string()),
    owner: v.id("users"),
    updatedAt: v.number(),
  })
    .index("owner", ["owner"])
    .index("category", ["category"])
    .index("owner_updated", ["owner", "updatedAt"])
    .index("name", ["name"]),
  grants: defineTable({
    wish: v.id("wishes"),
    grantor: v.id("users"),
    quantityGranted: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    updatedAt: v.number(),
  })
    .index("wish", ["wish"])
    .index("grantor", ["grantor"])
    .index("wish_status", ["wish", "status"])
    .index("grantor_updated", ["grantor", "updatedAt"]),
  categories: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.string(),
    updatedAt: v.number(),
  }).index("name", ["name"]),
});
