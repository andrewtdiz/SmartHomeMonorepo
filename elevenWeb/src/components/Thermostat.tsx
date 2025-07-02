import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Button } from "./ui/button";

const THERMOSTAT_ID = "jh77a8vh6jhv6ddwqdc4fttyd97jfte4" as Id<"thermostat">;

export function Thermostat() {
    const thermostat = useQuery(api.thermostat.getThermostat, { id: THERMOSTAT_ID });
    const toggleThermostat = useMutation(api.thermostat.updateThermostat);

    const handleThermostatClick = () => {
        if (!thermostat) return;

        if (thermostat.currentTemperature === thermostat.targetTemperature) return;

        const isCurrentBelowTarget = thermostat.currentTemperature < thermostat.targetTemperature;
        const newCurrentTemperature = isCurrentBelowTarget
            ? thermostat.currentTemperature + 1
            : thermostat.currentTemperature - 1;

        toggleThermostat({
            id: THERMOSTAT_ID,
            currentTemperature: newCurrentTemperature,
            mode: thermostat.mode
        });
    };

    if (thermostat === undefined) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-gray-300 flex items-center justify-center animate-pulse">
                    <span className="text-gray-400 text-sm font-bold">--°F</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Thermostat</span>
                <span className="text-xs text-gray-400">Loading...</span>
            </div>
        );
    }

    const isTemperatureDifferent = thermostat.currentTemperature !== thermostat.targetTemperature;
    const showModeIndicator = thermostat.isOn && isTemperatureDifferent && thermostat.mode;

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={handleThermostatClick}
            className={`h-20 w-14 flex flex-col gap-0 border border-transparent hover:bg-white hover:border-gray-300`}
        >
            <div className={`w-12! h-12! ${thermostat.isOn ? (thermostat.mode === 'cool' ? 'bg-blue-500' : 'bg-amber-400') : 'bg-gray-400'} rounded-full border-2 ${thermostat.isOn ? (thermostat.mode === 'cool' ? 'border-blue-300' : 'border-orange-300') : 'border-gray-300'} flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{thermostat.currentTemperature}°F</span>
            </div>
            <span className="text-xs mt-1 text-gray-600">Thermostat</span>
            {showModeIndicator && (
                <span className={`text-xs font-medium ${thermostat.mode === 'heat' ? 'text-red-600' : 'text-blue-600'}`}>
                    {thermostat.mode === 'heat' ? 'Heating' : '❄️ Cooling'}
                </span>
            )}
            {thermostat.isOn && (
                <span className="text-xs font-normal">Target: {thermostat.targetTemperature}°F</span>
            )}
        </Button>
    );
} 