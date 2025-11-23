/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as Password from "../Password.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as chats from "../chats.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as notifications from "../notifications.js";
import type * as users from "../users.js";
import type * as wishes from "../wishes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  Password: typeof Password;
  auth: typeof auth;
  categories: typeof categories;
  chats: typeof chats;
  http: typeof http;
  messages: typeof messages;
  notifications: typeof notifications;
  users: typeof users;
  wishes: typeof wishes;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
