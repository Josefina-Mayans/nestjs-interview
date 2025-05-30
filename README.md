# nextjs-interview / TodoApi

[![Open in Coder](https://dev.crunchloop.io/open-in-coder.svg)](https://dev.crunchloop.io/templates/fly-containers/workspace?param.Git%20Repository=git@github.com:crunchloop/nextjs-interview.git)

This is a simple Todo List API built in Nest JS and Typescript. This project is currently being used for Javascript/Typescript full-stack candidates.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Check integration tests at: (https://github.com/crunchloop/interview-tests)

## Contact

- Martín Fernández (mfernandez@crunchloop.io)

## About Crunchloop

![crunchloop](https://s3.amazonaws.com/crunchloop.io/logo-blue.png)

We strongly believe in giving back :rocket:. Let's work together [`Get in touch`](https://crunchloop.io/#contact).

## Using the MCP server
MCP servers are configured differently depending on the client that you are using. For reference, this is how you would configure it using Claude Desktop.

```json
{
  "mcpServers": {
    "todoapi": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "ABSOLUTE/PATH/WHERE/TODOAPI/PROJECT/IS/LOCATED/nestjs-interview/src/mcp/main.ts"
      ],
    }
  }
}
```
### MCP Transport

At the moment, only `stdio` transport has been implemented.

### Tools

- **create-todo-list** - Tool to create a new todo list.
  - `name`: Name of the todo list (string, required)

- **add-item-to-list** - Adds new item to an existing todo list using the list id'.
  - `listId`: List ID to which the item will be added (number, required)
  - `name`: Name of the item to be added (string, required)
  - `description`: Description of the item to be added (string, required)

- **update-todo-item** - Allows to update the description of an item in a todo list.
    - `listId`: List ID to which the item belongs (number, required)
    - `itemId`: Item ID to be updated (number, required)
    - `newDescription`: New description for the item (string, required)

- **markDone-todoItem** - Marks a todo item as completed.
    - `listId`: List ID of the todo list where the item is located (number, required)
    - `itemId`: Item ID of the item that will be marked as completed (number, required)

- **delete-todo-item** - Deletes an item from a todo list.
    - `listId`: ID of the todo list from which the item will be deleted (number, required)
    - `itemId`: ID of the item that will be deleted from the list (number, required)