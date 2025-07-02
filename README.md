# SmartHomeMonorepo

A monorepo containing a React web application and an MCP (Model Context Protocol) server, both powered by Convex for real-time data synchronization.

## Project Structure

- **elevenWeb/** - React web application with Tailwind CSS and shadcn/ui components
- **elevenMCP/** - MCP server with BAML integration for AI model interactions

## Prerequisites

- [Cerebras](https://www.cerebras.ai/) blazingly fast inference 
- [Convex](https://convex.dev) realtime DB
- [BAML](https://boundaryml.com) fast structured outputs from any LLM
- [Bun](https://bun.sh) - all-in-one JavaScript runtime

## Environment Variables

Create `.env` files in the respective project directories:

### For elevenMCP (MCP Server)
```env
# For fast AI model inference
CEREBRAS_API_KEY=your_cerebras_api_key_here

# Required for Convex integration
CONVEX_URL=your_convex_deployment_url_here

# Optional for OAI model use
OPENAI_API_KEY=your_openai_api_key_here
```

### For elevenWeb (Web Application)
```typescript
const CONVEX_URL = ""; // Add convex url to frontend.tsx
```

## Setup Instructions

### 1. Install Bun (if not already installed)
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone and Install Dependencies

```bash
# Install dependencies in each directory
bun install
```

### 3. Setup Convex

```bash
# Initialize Convex in elevenWeb
cd elevenWeb
bun convex dev

# Follow the prompts to create/connect to a Convex project

# Initialize Convex in elevenMCP
cd ../elevenMCP
convex dev
# Use the same Convex project for data synchronization
```

### 4. Setup BAML (for elevenMCP only)

```bash
cd elevenMCP

# Generate BAML client code
bun baml-cli generate
```

### 5. Configure Environment Variables

1. Copy your Convex deployment URL from the Convex dashboard
2. Add your API keys and Convex URL to the appropriate `.env` files
3. Ensure both projects use the same `CONVEX_URL` for data synchronization

## Running the Applications

### Development Mode

```bash
# Start the web application (from elevenWeb directory)
cd elevenWeb
bun dev

# Start the MCP server (from elevenMCP directory)
cd elevenMCP
bun start
```

### Production Mode

```bash
# Build and start web application
cd elevenWeb
bun start

# Start MCP server
cd elevenMCP
bun start
```

## Project Features

### elevenWeb
- React 19 with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Real-time data with Convex
- Form handling with React Hook Form and Zod

### elevenMCP
- MCP server implementation
- BAML integration for AI models
- Convex for data persistence
- Express.js server with CORS support
- TypeScript support

## Troubleshooting

1. **Convex connection issues**: Ensure both projects are using the same Convex project and deployment URL
2. **BAML generation errors**: Run `baml generate` in the elevenMCP directory after any schema changes
3. **API key errors**: Verify that all required environment variables are set correctly
4. **Port conflicts**: The default ports can be configured in the respective package.json scripts

## Contributing

1. Make sure to run setup instructions for both projects
2. Ensure environment variables are properly configured
3. Test both web and MCP components before submitting changes 