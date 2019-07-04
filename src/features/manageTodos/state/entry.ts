import { observable, action } from 'mobx';

import { getErrorMessage } from 'shared/helpers/error';
import { ITodo } from 'shared/types/models';
import getDeps from 'core/getDeps';
import {
  initialCommunicationField,
  loadingCommunicationField,
  makeFailedCommunicationField,
} from 'shared/helpers/communication';

import { ITodoCreationFields } from '../namespace';

const { api } = getDeps();

type Communication = 'loadingTodos' | 'creatingTodos' | 'deletingTodos';

class TodoStore {
  @observable public todos: ITodo[] = [];
  @observable public loadingTodos = initialCommunicationField;
  @observable public creatingTodos = initialCommunicationField;
  @observable public deletingTodos = initialCommunicationField;

  @action public async loadTodos() {
    this.errorDecorator(async () => {
      this.todos = await api.todo.loadCountries();
    }, 'loadingTodos');
  }

  @action public createTodo(fields: ITodoCreationFields) {
    this.errorDecorator(async () => {
      const todo = await api.todo.createTodo(fields);
      this.todos = this.todos.concat(todo);
    }, 'creatingTodos');
  }

  @action public deleteTodo(id: string) {
    this.errorDecorator(async () => {
      this.todos = this.todos.filter(todo => todo.id !== id); // optimistic UI
      await api.todo.deleteTodo(id);
    }, 'deletingTodos');
  }

  @action public async errorDecorator(executeAction: () => Promise<void>, communication: Communication) {
    try {
      this[communication] = loadingCommunicationField;
      await executeAction();
      this[communication] = initialCommunicationField;
    } catch (error) {
      this[communication] = makeFailedCommunicationField(getErrorMessage(error));
    }
  }
}

export default new TodoStore();
