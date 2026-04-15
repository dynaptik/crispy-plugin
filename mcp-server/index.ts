import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const server = new McpServer({
  name: "crispy-enforcer",
  version: "1.0.0"
});

/**
 * CAPABILITY 1: Context Firewall
 * Added the empty config object {} as the 3rd argument.
 */
server.registerResource(
  "feature-task",
  "file:///.crispy/01_task.md",
  { description: "The core requirement file" }, // This was the missing 3rd argument
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "Access restricted by CRISPY Context Firewall."
    }]
  })
);

/**
 * CAPABILITY 2: Git Worktree Tools
 */
server.registerTool(
  "create_worktree", 
  {
    description: "Creates a clean-room git worktree for a vertical slice", // Moved inside
    inputSchema: z.object({
      sliceName: z.string().describe("The name of the vertical slice")
    })
  },
  async ({ sliceName }: { sliceName: string }) => {
    const path = `.crispy-worktree/${sliceName}`;
    try {
      await execAsync(`git worktree add ${path} -b crispy-${sliceName}`);
      return {
        content: [{ type: "text", text: `✅ Worktree created at ${path}` }]
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [{ type: "text", text: `❌ Git Error: ${error.message}` }]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);