import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

@Module({
  providers: [TodoItemService],
  controllers: [TodoItemController],
  imports: [TodoListsModule],
})
export class TodoItemModule {}
