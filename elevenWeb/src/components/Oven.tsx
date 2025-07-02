import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

const OVEN_ID = "jd73emy2cs0v5zv156nast38197jeddd" as Id<"oven">;

export function Oven() {
    // Query oven data from Convex
    const oven = useQuery(api.oven.getOven, { id: OVEN_ID });
    const updateOven = useMutation(api.oven.updateOven);

    const handleOvenClick = () => {
        if (!oven) return;

        if (oven.currentTemperature === oven.targetTemperature) return;

        const isCurrentBelowTarget = oven.currentTemperature < oven.targetTemperature;
        const step = 50;
        let newCurrentTemperature;

        if (isCurrentBelowTarget) {
            newCurrentTemperature = Math.min(
                oven.currentTemperature + step,
                oven.targetTemperature
            );
        } else {
            newCurrentTemperature = Math.max(
                oven.currentTemperature - step,
                oven.targetTemperature
            );
        }

        updateOven({
            id: OVEN_ID,
            currentTemperature: newCurrentTemperature,
            isPreheating: newCurrentTemperature < oven.targetTemperature,
        });
    };

    // Show loading state while data is being fetched
    if (oven === undefined) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300 animate-pulse">
                    <span className="text-gray-400 text-sm font-bold">---°F</span>
                </div>
                <span className="text-xs text-gray-600">Oven</span>
                <span className="text-xs text-gray-400">Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-12 h-12 ${(oven.isOn || oven.currentTemperature > 0) ? 'bg-orange-400' : 'bg-gray-800'} rounded-lg flex items-center justify-center border-2 ${oven.isOn ? 'border-orange-500' : 'border-gray-600'} cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={handleOvenClick}
            >
                <span className="text-white text-sm font-bold">{oven.currentTemperature}°F</span>
            </div>
            <span className="text-xs text-gray-600">Oven</span>
            <span className={`text-xs font-medium ${oven.isPreheating ? 'text-orange-600' : ''}`}>
                {oven.isPreheating ? 'Preheating' : ''}
            </span>
            {oven.isOn && oven.targetTemperature !== 0 && oven.targetTemperature !== oven.currentTemperature && (
                <span className="text-xs font-normal">Target: {oven.targetTemperature}°F</span>
            )}
        </div>
    );
} 