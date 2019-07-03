import { ITodo } from 'shared/types/models';

import { IServerTodo } from '../types/Todo';

export function convertTodoResponse(todos: IServerTodo[]): ITodo[] {
  return todos.map(convertServerTodo);
}

export function convertServerTodo(todo: IServerTodo): ITodo {
  const { id, title, body } = todo;
  return { id, title, description: body };
}
