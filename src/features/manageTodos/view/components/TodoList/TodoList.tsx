import * as React from 'react';

import { Icon, Collapse } from 'shared/view/elements';
import { ITodo } from 'shared/types/models';
import { block } from 'shared/helpers/bem';

import './TodoList.scss';

const { Panel } = Collapse;
const b = block('todo-list');

interface IProps {
  todos: ITodo[];
  onDelete(id: string): void;
}

function TodoList(props: IProps) {
  const { todos, onDelete } = props;
  return (
    <Collapse accordion className={b()}>
      {todos.map(todo => (
        <Panel
          key={todo.id}
          header={todo.title}
        >
          <Todo todo={todo} onDelete={onDelete} />
        </Panel>))}
    </Collapse>
  );
}

const todoB = block('list-todo');

interface ITodoProps {
  todo: ITodo;
  onDelete(id: string): void;
}

function Todo(props: ITodoProps) {
  const { todo, onDelete } = props;

  const remove = React.useCallback(() => {
    onDelete(todo.id);
  }, []);

  return (
    <div className={todoB()}>
      <p>{todo.description}</p>
      <div className={todoB('footer')}>
        <Icon type="delete" onClick={remove} className={todoB('remove-icon')} />
      </div>
    </div>
  );
}

export default TodoList;
