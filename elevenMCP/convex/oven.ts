import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getOven = query({
    args: { id: v.id("oven") },
    handler: async (ctx, args) => {
        const oven = await ctx.db.get(args.id);
        if (!oven) {
            throw new Error("Oven not found");
        }
        return oven;
    },
});

export const updateOven = mutation({
    args: {
        id: v.id("oven"),
        isOn: v.optional(v.boolean()),
        mode: v.optional(v.union(v.literal("heat"), v.literal("cool"))),
        isPreheating: v.optional(v.boolean()),
        currentTemperature: v.optional(v.number()),
        targetTemperature: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updateFields } = args;

        const oven = await ctx.db.get(id);
        if (!oven) {
            throw new Error("Oven not found");
        }

        const fieldsToUpdate: any = {};
        if (updateFields.isOn !== undefined) fieldsToUpdate.isOn = updateFields.isOn;
        if (updateFields.mode !== undefined) fieldsToUpdate.mode = updateFields.mode;
        if (updateFields.isPreheating !== undefined) fieldsToUpdate.isPreheating = updateFields.isPreheating;
        if (updateFields.currentTemperature !== undefined) fieldsToUpdate.currentTemperature = updateFields.currentTemperature;
        if (updateFields.targetTemperature !== undefined) fieldsToUpdate.targetTemperature = updateFields.targetTemperature;

        await ctx.db.patch(id, fieldsToUpdate);

        return await ctx.db.get(id);
    },
});
