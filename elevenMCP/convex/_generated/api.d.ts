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
import type * as dishwasher from "../dishwasher.js";
import type * as dryer from "../dryer.js";
import type * as lights from "../lights.js";
import type * as oven from "../oven.js";
import type * as thermostat from "../thermostat.js";
import type * as washer from "../washer.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  dishwasher: typeof dishwasher;
  dryer: typeof dryer;
  lights: typeof lights;
  oven: typeof oven;
  thermostat: typeof thermostat;
  washer: typeof washer;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
