import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getDishwasher = query({
    args: { id: v.id("dishwasher") },
    handler: async (ctx, args) => {
        const dishwasher = await ctx.db.get(args.id);
        if (!dishwasher) {
            throw new Error("Dishwasher not found");
        }
        return dishwasher;
    },
});

export const updateDishwasher = mutation({
    args: {
        id: v.id("dishwasher"),
        isOn: v.optional(v.boolean()),
        endTimestamp: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updateFields } = args;

        const dishwasher = await ctx.db.get(id);
        if (!dishwasher) {
            throw new Error("Dishwasher not found");
        }

        const fieldsToUpdate: any = {};
        if (updateFields.isOn !== undefined) fieldsToUpdate.isOn = updateFields.isOn;
        if (updateFields.endTimestamp !== undefined) fieldsToUpdate.endTimestamp = updateFields.endTimestamp;

        await ctx.db.patch(id, fieldsToUpdate);

        return await ctx.db.get(id);
    },
});
