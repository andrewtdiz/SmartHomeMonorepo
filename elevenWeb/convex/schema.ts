import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lights: defineTable({
    location: v.string(),
    name: v.string(),
    isOn: v.boolean(),
  }).index("by_location_name", ["location", "name"]),

  oven: defineTable({
    isOn: v.boolean(),
    isPreheating: v.boolean(),
    currentTemperature: v.number(),
    targetTemperature: v.number(),
    endTimestamp: v.number(),
  }),

  thermostat: defineTable({
    isOn: v.boolean(),
    mode: v.optional(v.union(v.literal("heat"), v.literal("cool"))),
    currentTemperature: v.number(),
    targetTemperature: v.number(),
  }),

  dishwasher: defineTable({
    isOn: v.boolean(),
    endTimestamp: v.number(),
  }),

  washer: defineTable({
    endTimestamp: v.number(),
  }),

  dryer: defineTable({  
    endTimestamp: v.number(),
  }),
});