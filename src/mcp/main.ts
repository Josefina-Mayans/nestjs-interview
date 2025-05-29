import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'Todo API',
  version: '1.0.0',
});

server.tool(
  'create-todo-list',
  'Tool to create a new todo list',
  {
    name: z.string().describe('Name of the todo list'),
  },
  async ({ name }) => {
    try {
      const response = await fetch('http://localhost:3000/api/todolists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();

      if ('error' in data) {
        return {
          content: [
            {
              type: 'text',
              text: `List with name ${name} already exists`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Could not create todo list ${name}: ${error.message}`,
          },
        ],
      };
    }
  },
);

const transport = new StdioServerTransport();
async function main() {
  await server.connect(transport);
}

main();
