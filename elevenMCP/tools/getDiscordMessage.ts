import z from "zod";

async function getDiscordMessage() {
  console.log("Getting message from Discord");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    content: [{ type: "text" as const, text: `Why don't scientists trust atoms? Because they make up everything.` }]
  };
}

export const getDiscordMessageTool = {
  name: "get-discord-message",
  config: {
    title: "Get Discord Message",
    description: "Get a message from Discord via webhook",
  },
  handler: getDiscordMessage
}; 