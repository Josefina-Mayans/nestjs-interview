import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoItem } from 'src/interfaces/todo_item.interface';
import { CreateTodoItemDto } from './dtos/create-todo_item';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class TodoItemService {
  constructor(private readonly todoListsService: TodoListsService) {}

  create(todoListId: number, dto: CreateTodoItemDto): TodoItem {
    const todoList = this.todoListsService.get(todoListId);
    if (!todoList) throw new NotFoundException('TodoList not found');

    const item: TodoItem = {
      id: this.nextId(todoListId),
      name: dto.name,
      todoListId,
      description: dto.description,
      completed: dto.completed ?? false,
    };
    this.todoListsService.add_NewItem(todoListId, item);
    return item;
  }

  /*   update(todoListId: number, itemId: number, description: string): TodoItem {
    const item = this.todoListsService.getItem(todoListId, itemId);
    if (!item) throw new NotFoundException('TodoItem not found');
    item.description = description;
    return item;
  }

  complete(todoListId: number, itemId: number): TodoItem {
    const item = this.todoListsService.getItem(todoListId, itemId);
    if (!item) throw new NotFoundException('TodoItem not found');
    item.completed = true;
    return item;
  }

  delete(todoListId: number, itemId: number): boolean {
    return this.todoListsService.removeItem(todoListId, itemId);
  } */

  findByList(todoListId: number): TodoItem[] {
    const list = this.todoListsService.get(todoListId);
    if (!list) throw new NotFoundException('TodoList not found');
    return list.items || [];
  }

  private nextId(listId: number): number {
    const todoList = this.todoListsService.get(listId);
    const items = todoList.items;
    const last = items
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
