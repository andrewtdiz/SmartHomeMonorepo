import { ConvexHttpClient } from "convex/browser";

export const httpClient = new ConvexHttpClient(process.env.CONVEX_URL!);