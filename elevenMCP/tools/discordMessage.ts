import z from "zod";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1381361102625177762/1_ohcCMpZjNzaRLhNd8Aa-Fi7UedtNGg8VmftQD9vgzEvg73JJvUFyY9oa-LxIi6fnxm";

async function sendDiscordMessage({ message }: { message: string }) {
  console.log("Sending message to Discord:", message);
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    if (response.ok) {
      return {
        content: [{ type: "text" as const, text: `Successfully sent message to Discord: "${message}"` }]
      };
    } else {
      throw new Error(`Discord webhook returned ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Failed to send discord webhook", err);
    return {
      content: [{ type: "text" as const, text: `Failed to send message to Discord: ${err instanceof Error ? err.message : 'Unknown error'}` }]
    };
  }
}

export const discordMessageTool = {
  name: "discord-message",
  config: {
    title: "Send Discord Message",
    description: "Send a message to Discord via webhook",
    inputSchema: { message: z.string() }
  },
  handler: sendDiscordMessage
}; 