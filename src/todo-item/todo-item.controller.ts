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
  findByList(@Param('listId') listId: string) {
    return this.service.findByList(Number(listId));
  }

  /* @Put(':id')
  update(@Param('id') id: string, @Body('description') description: string) {
    return this.service.update(id, description);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.service.complete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  } */
}
