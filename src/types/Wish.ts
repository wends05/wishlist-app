import type { FunctionReturnType } from "convex/server";
import type { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

export type BaseWish = Doc<"wishes">;

export type GrantedWish = FunctionReturnType<
  typeof api.wishes.getGrantedWishes
>[number];

export type WishWithoutStatus = FunctionReturnType<
  typeof api.wishes.getWishesWithoutStatus
>[number];

export type HomePageWish = FunctionReturnType<
  typeof api.wishes.getHomePageWishes
>["page"][number];

export type ReservedWish = FunctionReturnType<
  typeof api.wishes.getReservedWishes
>[number];

export type Wish =
  | BaseWish
  | GrantedWish
  | WishWithoutStatus
  | HomePageWish
  | ReservedWish;
