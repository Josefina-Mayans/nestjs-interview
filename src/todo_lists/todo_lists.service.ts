import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { TodoList } from '../interfaces/todo_list.interface';
import { TodoItem } from 'src/interfaces/todo_item.interface';

@Injectable()
export class TodoListsService {
  private readonly todolists: TodoList[];

  constructor(todoLists: TodoList[] = []) {
    this.todolists = todoLists;
  }

  all(): TodoList[] {
    return this.todolists;
  }

  get(id: number): TodoList {
    return this.todolists.find((x) => x.id === Number(id));
  }

  create(dto: CreateTodoListDto): TodoList {
    const todoList: TodoList = {
      id: this.nextId(),
      name: dto.name,
      items: [],
    };

    this.todolists.push(todoList);

    return todoList;
  }

  update(id: number, dto: UpdateTodoListDto): TodoList {
    const todolist = this.todolists.find((x) => x.id == Number(id));

    // Update the record
    todolist.name = dto.name;

    return todolist;
  }

  delete(id: number): void {
    const index = this.todolists.findIndex((x) => x.id == Number(id));

    if (index > -1) {
      this.todolists.splice(index, 1);
    }
  }

  add_NewItem(id: number, item: TodoItem): TodoList {
    const todoList = this.get(id);
    if (!todoList.items) {
      todoList.items = [];
    }
    todoList.items.push(item);

    return todoList;
  }

  getItem(todoListId: number, itemId: number): TodoItem {
    const list = this.get(todoListId);
    return list?.items?.find((item) => item.id === itemId);
  }

  removeItem(todoListId: number, itemId: number): boolean {
    const list = this.get(todoListId);
    const index = list?.items?.findIndex((item) => item.id === itemId);
    if (index !== undefined && index > -1) {
      list.items.splice(index, 1);
      return true;
    }
    return false;
  }

  private nextId(): number {
    const last = this.todolists
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
