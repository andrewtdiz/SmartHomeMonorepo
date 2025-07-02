import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startMCPSSEServer } from "./bunsse";
import { receiveRequestTool } from "./tools/receiveRequest.js";

startMCPSSEServer((process.env.PORT as unknown as number) || 4000, "/sse", "/message", () => {
    const server = new McpServer({
        name: "Eleven",
        version: "1.0.0",
    });

    server.registerTool(
        receiveRequestTool.name,
        receiveRequestTool.config,
        receiveRequestTool.handler
    );

    return server;
});