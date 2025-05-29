import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dtos/create-todo_item';

@Controller('api/todo-item')
export class TodoItemController {
  constructor(private readonly service: TodoItemService) {}

  @Post(':listId')
  create(@Param('listId') listId: number, @Body() dto: CreateTodoItemDto) {
    return this.service.create(listId, dto);
  }

  @Get(':listId')
  findByList(@Param('listId') listId: number) {
    return this.service.findByList(Number(listId));
  }

  @Put(':listId/:itemId')
  update(
    @Param('listId') listId: number,
    @Param('itemId') itemId: number,
    @Body('description') description: string,
  ) {
    return this.service.update(Number(listId), Number(itemId), description);
  }

  @Patch(':listId/:itemId/complete')
  complete(@Param('listId') listId: number, @Param('itemId') itemId: number) {
    return this.service.complete(Number(listId), Number(itemId));
  }

  @Delete(':listId/:itemId')
  remove(@Param('listId') listId: number, @Param('itemId') itemId: number) {
    return this.service.delete(Number(listId), Number(itemId));
  }
}
