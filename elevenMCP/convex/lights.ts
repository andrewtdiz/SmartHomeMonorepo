import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getLights = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("lights").collect();
    },
});

export const getLight = query({
    args: { name: v.string(), location: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("lights").withIndex("by_location_name", (q) =>
            q.eq("location", args.location).eq("name", args.name)
        ).first();
    },
});

export const toggleLight = mutation({
    args: { id: v.id("lights") },
    handler: async (ctx, args) => {
        const light = await ctx.db.get(args.id);
        if (!light) {
            throw new Error("Light not found");
        }

        await ctx.db.patch(args.id, {
            isOn: !light.isOn,
        });

        return await ctx.db.get(args.id);
    },
});

export const setMultipleLights = mutation({
    args: { lights: v.array(v.object({ name: v.string(), location: v.string(), isOn: v.boolean() })) },
    handler: async (ctx, args) => {
        for (const lightUpdate of args.lights) {
            // Find the light by name and location
            const existingLight = await ctx.db
                .query("lights")
                .withIndex("by_location_name", (q) =>
                    q.eq("location", lightUpdate.location).eq("name", lightUpdate.name)
                )
                .first();

            if (existingLight) {
                // Update existing light
                await ctx.db.patch(existingLight._id, {
                    isOn: lightUpdate.isOn,
                });
            }
        }
    },
});

export const setLight = mutation({
    args: { name: v.string(), location: v.string(), isOn: v.boolean() },
    handler: async (ctx, args) => {
        const light = await ctx.db.query("lights").withIndex("by_location_name", (q) =>
            q.eq("location", args.location).eq("name", args.name)
        ).first();
        if (!light) {
            throw new Error("Light not found");
        }

        await ctx.db.patch(light._id, {
            isOn: args.isOn,
        });

        return await ctx.db.get(light._id);
    },
});
