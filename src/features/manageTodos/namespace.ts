import { ITodo } from 'shared/types/models';
import { IPlainAction, IAction, IPlainFailAction } from 'shared/types/reactive';

export interface ITodosState {
  todos: ITodo[];
}

export type ITodoCreationFields = Omit<ITodo, 'id'>;

export type LoadTodos = IPlainAction<'MANAGE_TODOS:LOAD_TODOS'>;
export type LoadTodosComplete = IAction<'MANAGE_TODOS:LOAD_TODOS_COMPLETE', { todos: ITodo[] }>;
export type LoadTodosFailed = IPlainFailAction<'MANAGE_TODOS:LOAD_TODOS_FAILED'>;

export type CreateTodo = IAction<'MANAGE_TODOS:CREATE_TODO', ITodoCreationFields>;
export type CreateTodoComplete = IAction<'MANAGE_TODOS:CREATE_TODO_COMPLETE', { todo: ITodo }>;
export type CreateTodosFailed = IPlainFailAction<'MANAGE_TODOS:CREATE_TODO_FAILED'>;

export type DeleteTodo = IAction<'MANAGE_TODOS:DELETE_TODO', { todoId: string }>;
export type DeleteTodoComplete = IAction<'MANAGE_TODOS:DELETE_TODO_COMPLETE', { todoId: string }>;
export type DeleteTodosFailed = IPlainFailAction<'MANAGE_TODOS:DELETE_TODO_FAILED'>;

export type Action =
  LoadTodos | LoadTodosComplete | LoadTodosFailed
  | CreateTodo | CreateTodoComplete | CreateTodosFailed
  | DeleteTodo | DeleteTodoComplete | DeleteTodosFailed
  ;
