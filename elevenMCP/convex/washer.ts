import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getWasher = query({
    args: { id: v.id("washer") },
    handler: async (ctx, args) => {
        const washer = await ctx.db.get(args.id);
        if (!washer) {
            throw new Error("Washer not found");
        }
        return washer;
    },
});

export const updateWasher = mutation({
    args: {
        id: v.id("washer"),
        endTimestamp: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updateFields } = args;

        const washer = await ctx.db.get(id);
        if (!washer) {
            throw new Error("Washer not found");
        }

        const fieldsToUpdate: any = {};
        if (updateFields.endTimestamp !== undefined) fieldsToUpdate.endTimestamp = updateFields.endTimestamp;

        await ctx.db.patch(id, fieldsToUpdate);

        return await ctx.db.get(id);
    },
});
