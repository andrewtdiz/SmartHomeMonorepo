import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const DISHWASHER_ID = "j974x1msv4a3jfs7gaprzjavrn7jfxjs" as Id<"dishwasher">;

export function Dishwasher() {
    const dishwasher = useQuery(api.dishwasher.getDishwasher, { id: DISHWASHER_ID });
    const [currentTime, setCurrentTime] = useState(Date.now());

    const getTimeRemaining = (endTime: number | null): number => {
        if (!endTime) return 0;
        const remaining = Math.max(0, Math.ceil((endTime - currentTime) / 1000));
        return remaining;
    };
    const toggleDishwasher = useMutation(api.dishwasher.updateDishwasher);

    const dishwasherTimeRemaining = getTimeRemaining(dishwasher?.endTimestamp);
    const isDishwasherRunning = dishwasherTimeRemaining > 0;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (dishwasher === undefined) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-10 h-8 rounded-lg flex items-center justify-center border-2 bg-gray-200 border-gray-300 animate-pulse">
                </div>
                <span className="text-xs text-gray-600">Dishwasher</span>
                <span className="text-xs text-gray-400">Loading...</span>
            </div>
        );
    }

    return (
        <Button size="icon" variant="ghost" onClick={() => toggleDishwasher({ id: DISHWASHER_ID, isOn: !isDishwasherRunning, endTimestamp: !isDishwasherRunning ? Date.now() + 15 * 60 * 1000 : 0 })} className={`h-20 pt-2 w-16 flex flex-col gap-0 space-y-0 justify-center items-center border border-transparent hover:bg-white hover:border-gray-300`}>
            <div className={`w-10 h-8 rounded-lg flex items-center justify-center border-2 ${isDishwasherRunning
                ? 'bg-blue-600 border-blue-800'
                : 'bg-gray-300 border-gray-400'
                }`}>
                {isDishwasherRunning && (
                    <div className="flex space-x-1">
                        <div className="w-1 h-2 bg-white rounded animate-bounce"></div>
                        <div className="w-1 h-2 bg-white rounded animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-2 bg-white rounded animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                )}
            </div>
            <span className="text-xs text-gray-600">Dishwasher</span>
            {isDishwasherRunning && (
                <span className="text-xs text-gray-600">
                    {formatTime(dishwasherTimeRemaining)}
                </span>
            )}
        </Button>
    );
} 