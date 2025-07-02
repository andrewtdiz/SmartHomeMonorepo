import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const DRYER_ID = "jn721kdw7f2772wnp5wpgb6pth7jfz3t" as Id<"dryer">;

export function Dryer() {
    const dryer = useQuery(api.dryer.getDryer, { id: DRYER_ID });
    const [currentTime, setCurrentTime] = useState(Date.now());
    const endTime = dryer?.endTimestamp ? dryer.endTimestamp : 0;
    const toggleDryer = useMutation(api.dryer.updateDryer);

    const getTimeRemaining = (endTime: number | null): number => {
        if (!endTime) return 0;
        const remaining = Math.max(0, Math.ceil((endTime - currentTime) / 1000));
        return remaining;
    };

    const timeRemaining = getTimeRemaining(dryer?.endTimestamp);
    const isRunning = endTime > 0 && timeRemaining > 0;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    if (!dryer) return (
        <div className="flex flex-col items-center">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-12 h-4" />
        </div>
    );

    return (
        <Button size="icon" variant="ghost" onClick={() => toggleDryer({ id: DRYER_ID, endTimestamp: !isRunning ? Date.now() + 15 * 60 * 1000 : 0 })} className={`h-16 w-14 flex flex-col gap-0 space-y-0 justify-center items-center border border-transparent hover:bg-white hover:border-gray-300`}>
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${isRunning
                ? 'bg-blue-600 border-blue-800'
                : 'bg-gray-400 border-gray-500'
                }`}>
                {isRunning && <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-white animate-pulse' : 'bg-gray-300'
                    }`}></div>}
            </div>
            <span className="text-xs">Dryer</span>
            {isRunning && (
                <span className="text-xs text-gray-600">
                    {formatTime(timeRemaining)}
                </span>
            )}
        </Button>
    );
} 