import { BindAll } from 'lodash-decorators';

import { convertTodoResponse, convertServerTodo } from '../converters';
import BaseApi from './BaseApi';
import { map } from 'rxjs/operators';
import { IServerTodo, FieldForTodoCreation } from '../types/Todo';
import { convertTodoToRequest } from '../converters/request';

@BindAll()
class Todo extends BaseApi {

  public loadTodos() {
    return this.actions.get<IServerTodo[]>({
      url: '/notes',
    }).pipe(
      map(response => response.data),
      map(convertTodoResponse),
    );
  }

  public createTodo(fields: FieldForTodoCreation) {
    return this.actions.post<IServerTodo>({
      url: '/note',
      data: convertTodoToRequest(fields),
    }).pipe(
      map(response => this.handleResponse(response, convertServerTodo)),
    );
  }

  public deleteTodo(id: string) {
    return this.actions.delete<void>({
      url: '/note',
      data: { id },
    }).pipe(
      map(response => response.data),
    );
  }
}

export default Todo;
