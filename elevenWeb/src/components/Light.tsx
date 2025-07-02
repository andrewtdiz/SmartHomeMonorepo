import { cn } from "@/lib/utils";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import { Button } from "./ui/button";

interface LightProps {
    className?: string;
    name: string;
    location: string;
}

export function Light({ className, location, name }: LightProps) {
    const lights = useQuery(api.lights.getLights);
    const light = lights?.find(light => light.location === location && light.name === name);
    const lightId = useMemo(() => {
        return lights?.find(light => light.location === location && light.name === name)?._id;
    }, [lights, location, name]);

    const toggleLight = useMutation(api.lights.toggleLight);

    return (
        <Button size="icon" variant="ghost" onClick={() => toggleLight({ id: lightId })} className={`h-16 w-18 flex flex-col justify-center items-center border border-transparent hover:border-gray-300 ${light?.isOn ? "hover:bg-white" : "hover:bg-yellow-100"}`}>
            <div className={cn("w-6! h-6! rounded-full shadow-lg", className, light?.isOn ? "bg-yellow-400 animate-pulse" : "bg-gray-400")}></div>
            <span className="text-xs font-normal">{name}</span>
        </Button>
    )
}