import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { TodoItemModule } from './todo-item/todo-item.module';

@Module({
  imports: [TodoListsModule, TodoItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
