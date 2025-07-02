import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getDryer = query({
    args: { id: v.id("dryer") },
    handler: async (ctx, args) => {
        const dryer = await ctx.db.get(args.id);
        if (!dryer) {
            throw new Error("Dryer not found");
        }
        return dryer;
    },
});

export const updateDryer = mutation({
    args: {
        id: v.id("dryer"),
        endTimestamp: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updateFields } = args;

        const dryer = await ctx.db.get(id);
        if (!dryer) {
            throw new Error("Dryer not found");
        }

        const fieldsToUpdate: any = {};
        if (updateFields.endTimestamp !== undefined) fieldsToUpdate.endTimestamp = updateFields.endTimestamp;

        await ctx.db.patch(id, fieldsToUpdate);

        return await ctx.db.get(id);
    },
});
