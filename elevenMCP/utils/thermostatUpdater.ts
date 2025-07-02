import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

const THERMOSTAT_ID = "jh77a8vh6jhv6ddwqdc4fttyd97jfte4" as Id<"thermostat">;

export class ThermostatUpdater {
    private static instance: ThermostatUpdater | null = null;
    private httpClient: ConvexHttpClient;
    private timer: NodeJS.Timeout | null = null;

    private constructor(convexUrl: string) {
        this.httpClient = new ConvexHttpClient(convexUrl);
    }

    static getInstance(convexUrl?: string): ThermostatUpdater {
        if (!ThermostatUpdater.instance) {
            if (!convexUrl) throw new Error("ConvexUrl required for initialization");
            ThermostatUpdater.instance = new ThermostatUpdater(convexUrl);
        }
        return ThermostatUpdater.instance;
    }

    async start(): Promise<void> {
        if (this.timer) return;
        this.update();
    }

    stop(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    private async update(): Promise<void> {
        try {
            const thermostat = await this.httpClient.query(api.thermostat.getThermostat, { id: THERMOSTAT_ID });

            if (!thermostat.isOn || thermostat.currentTemperature === thermostat.targetTemperature) {
                this.stop();
                return;
            }

            const diff = thermostat.targetTemperature - thermostat.currentTemperature;
            const newTemp = thermostat.currentTemperature + Math.sign(diff);

            await this.httpClient.mutation(api.thermostat.updateThermostat, {
                id: THERMOSTAT_ID,
                currentTemperature: newTemp
            });

            this.timer = setTimeout(() => this.update(), 3000);
        } catch (error) {
            console.error("Thermostat update failed:", error);
            this.timer = setTimeout(() => this.update(), 3000);
        }
    }
}

