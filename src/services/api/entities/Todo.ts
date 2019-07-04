import { BindAll } from 'lodash-decorators';

import { convertTodoResponse, convertServerTodo } from '../converters';
import BaseApi from './BaseApi';
import { IServerTodo, FieldForTodoCreation } from '../types/Todo';
import { convertTodoToRequest } from '../converters/request';
import { ITodo } from 'shared/types/models';

@BindAll()
class Todo extends BaseApi {

  public async loadCountries(): Promise<ITodo[]> {
    const response = await this.actions.get<IServerTodo[]>({
      url: `/notes`,
    });
    return this.handleResponse(response, convertTodoResponse);
  }

  public async createTodo(fields: FieldForTodoCreation) {
    const response = await this.actions.post<IServerTodo>({
      url: '/note',
      data: convertTodoToRequest(fields),
    });
    return this.handleResponse(response, convertServerTodo);
  }

  public async deleteTodo(id: string) {
    const response = await this.actions.delete<IServerTodo>({
      url: '/note',
      data: { id },
    });
    return this.handleResponse(response);
  }
}

export default Todo;
