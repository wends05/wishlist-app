/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Password from "../Password.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as http from "../http.js";
import type * as users from "../users.js";
import type * as wishes from "../wishes.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  Password: typeof Password;
  auth: typeof auth;
  categories: typeof categories;
  http: typeof http;
  users: typeof users;
  wishes: typeof wishes;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
