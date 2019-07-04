import * as React from 'react';
import { useObserver } from 'mobx-react-lite';

import { Spinner, Modal, Button, Alert } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';

import { TodoList, NewTodo } from '../../components';

import './Todos.scss';
import { todoStore } from 'features/manageTodos/state';
import getDeps from 'core/getDeps';

const b = block('todos');

// TODO:REPLACE TO CONTEXT
const { messageService } = getDeps();

function Todos() {

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    todoStore.loadTodos();
  }, []);

  const todos = useObserver(() => todoStore.todos);
  const loadingTodos = useObserver(() => todoStore.loadingTodos);
  React.useEffect(() => {
    if (loadingTodos.error) {
      setError(loadingTodos.error);
    }
  }, [loadingTodos.error]);

  const creatingTodo = useObserver(() => todoStore.creatingTodos);
  const createTodo = React.useCallback(async (title: string, description: string) => {
    await todoStore.createTodo({ title, description });
  }, []);
  React.useEffect(() => {
    if (creatingTodo.error) {
      setError(creatingTodo.error);
    }
  }, [creatingTodo.error]);

  const deletingTodo = useObserver(() => todoStore.creatingTodos);
  const deleteTodo = React.useCallback(async (id: string) => {
    await todoStore.deleteTodo(id);
  }, []);
  React.useEffect(() => {
    if (deletingTodo.error) {
      setError(deletingTodo.error);
    }
  }, [deletingTodo.error]);

  const closeErrorModal = React.useCallback(() => {
    setError('');
  }, []);

  const notification = useObserver(() => messageService.lastMessage);
  const [isShowNotification, setIsShowNotification] = React.useState(false);
  React.useEffect(() => {
    notification && setIsShowNotification(true);
  }, [notification]);

  const closeNotification = React.useCallback(() => {
    setIsShowNotification(false);
  }, []);

  return (
    <>
      <div className={b()}>
        <Spinner spinning={loadingTodos.isRequesting} size="large" tip="Loading ...">
          <div className={b('new-todo')}>
            <NewTodo onCreate={createTodo} isLoading={creatingTodo.isRequesting} />
          </div>
          {notification && isShowNotification &&
            <Alert
              message={notification.payload.title}
              description={notification.payload.body}
              type="warning"
              onClose={closeNotification}
              closable
            />
          }
          {todos && <TodoList todos={todos} onDelete={deleteTodo} />}
        </Spinner>
      </div>
      <Modal
        title="There is some error ..."
        visible={!!error}
        footer={[
          <Button key="submit" type="primary" onClick={closeErrorModal}>
            ok
          </Button>,
        ]}
      >
        <p>{error}</p>
      </Modal>
    </>
  );
}

export default Todos;
