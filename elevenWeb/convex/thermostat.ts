import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getThermostat = query({
    args: { id: v.id("thermostat") },
    handler: async (ctx, args) => {
        const thermostat = await ctx.db.get(args.id);
        if (!thermostat) {
            throw new Error("Thermostat not found");
        }
        return thermostat;
    },
});

export const updateThermostat = mutation({
    args: {
        id: v.id("thermostat"),
        isOn: v.optional(v.boolean()),
        mode: v.optional(v.union(v.literal("heat"), v.literal("cool"))),
        currentTemperature: v.optional(v.number()),
        targetTemperature: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updateFields } = args;

        const thermostat = await ctx.db.get(id);
        if (!thermostat) {
            throw new Error("Thermostat not found");
        }

        const fieldsToUpdate: any = {};
        if (updateFields.isOn !== undefined) fieldsToUpdate.isOn = updateFields.isOn;
        if (updateFields.mode !== undefined) fieldsToUpdate.mode = updateFields.mode;
        if (updateFields.currentTemperature !== undefined) fieldsToUpdate.currentTemperature = updateFields.currentTemperature;
        if (updateFields.targetTemperature !== undefined) fieldsToUpdate.targetTemperature = updateFields.targetTemperature;

        await ctx.db.patch(id, fieldsToUpdate);

        return await ctx.db.get(id);
    },
});
