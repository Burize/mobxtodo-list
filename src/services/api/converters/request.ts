import { CreateTodoRequest, FieldForTodoCreation } from '../types/Todo';

export function convertTodoToRequest(todoRequest: FieldForTodoCreation): CreateTodoRequest {
  const { title, description } = todoRequest;
  return { title, body: description };
}
