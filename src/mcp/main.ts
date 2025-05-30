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

server.tool(
  'add-item-to-list',
  'Adds new item to an existing todo list using the list id',
  {
    listId: z.number().describe('List ID to which the item will be added'),
    name: z.string().describe('Name of the item to be added'),
    description: z.string().describe('Description of the item to be added'),
  },
  async ({ listId, name, description }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo-item/${listId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, description: description }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error creating new list item`);
      }

      const data = await response.json();

      if ('error' in data) {
        return {
          content: [
            {
              type: 'text',
              text: `Error, the list does not exist`,
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
            text: `Could not add item to list: ${(error as Error).message}`,
          },
        ],
      };
    }
  },
);

server.tool(
  'update-todo-item',
  'Allows to update the description of an item in a todo list',
  {
    listId: z
      .number()
      .describe('List id of the todo list where the item is located'),
    itemId: z
      .number()
      .describe('Item id of the item whose description will be updated'),
    newDescription: z.string().describe('New description for the item'),
  },
  async ({ listId, itemId, newDescription }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo-item/${listId}/${itemId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: newDescription,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Could not update item description for item id: ${itemId} from the list with id: ${listId}`,
        );
      }

      const data = await response.json();

      if ('error' in data) {
        return {
          content: [
            {
              type: 'text',
              text: `Item with id ${itemId} does not exist, or list with id ${listId} does not exist.`,
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
            text: `Could not change item description: ${
              (error as Error).message
            }`,
          },
        ],
      };
    }
  },
);

server.tool(
  'markDone-todoItem',
  'Marks a todo item as completed',
  {
    listId: z
      .number()
      .describe('List id of the todo list where the item is located'),
    itemId: z
      .number()
      .describe('Item id of the item that will be marked as completed'),
  },
  async ({ listId, itemId }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo-item/${listId}/${itemId}/complete`,
        {
          method: 'PATCH',
        },
      );

      if (!response.ok) {
        throw new Error(
          `Could not mark item as completed for item id: ${itemId} from the list with id: ${listId}`,
        );
      }

      const data = await response.json();

      if ('error' in data) {
        return {
          content: [
            {
              type: 'text',
              text: `Could mark item with id ${itemId} as completed, or list with id ${listId} does not exist.`,
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
            text: `Could not mark item as completed: ${
              (error as Error).message
            }`,
          },
        ],
      };
    }
  },
);

server.tool(
  'delete-todo-item',
  'Deletes an item from a todo list',
  {
    listId: z
      .number()
      .describe('Id of the todo list from which the item will be deleted'),
    itemId: z
      .number()
      .describe('Id of the item that will be deleted from the list'),
  },
  async ({ listId, itemId }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo-item/${listId}/${itemId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`Error deleting item with id: ${itemId}`);
      }

      const deleteItemResponse = await response.text();
      if (deleteItemResponse) {
        const data = JSON.parse(deleteItemResponse);

        if (!data) {
          return {
            content: [
              {
                type: 'text',
                text: `Item or list does not exist`,
              },
            ],
          };
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: 'Item deleted successfully',
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Could not delete item: ${(error as Error).message}`,
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
