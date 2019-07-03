import * as React from 'react';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Spinner, Modal, Button, Alert } from 'shared/view/elements';
import { useObservable, useCommunicationObserver } from 'shared/helpers/reactive';
import { ITodo, Message } from 'shared/types/models';
import { block } from 'shared/helpers/bem';
import { selectors as messagesSelector } from 'services/messages';

import { TodoList, NewTodo } from '../../components';
import { selectors, actions } from '../../../state';

import './Todos.scss';

const b = block('todos');

function Todos() {

  const [todos] = useObservable<ITodo[], ITodo>(() => (
    selectors.selectTodos()
  ));

  const [loadingTodos] = useCommunicationObserver(() => (
    selectors.selectCommunication('loadingTodos')
  ));

  const [creatingTodo] = useCommunicationObserver(() => (
    selectors.selectCommunication('creatingTodo')
  ));

  React.useEffect(() => {
    actions.loadTodos();
  }, []);

  const createTodo = React.useCallback((title: string, description: string) => {
    actions.createTodo({ title, description });
  }, []);

  const deleteTodo = React.useCallback((todoId: string) => {
    actions.deleteTodo(todoId);
  }, []);

  const [error, setError] = useObservable<string, string>((event$) => {
    return merge(
      selectors.selectCommunication('creatingTodo').pipe(map(communication => communication.error)),
      selectors.selectCommunication('loadingTodos').pipe(map(communication => communication.error)),
      event$);
  }, '');

  const closeErrorModal = React.useCallback(() => {
    setError('');
  }, []);

  const [notification, setNotification] = useObservable<Message | null, Message | null>(
    (action$) => {
      return merge(action$, messagesSelector.selectLastMessage());
    }, null);

  const closeNotification = React.useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <>
      <div className={b()}>
        <Spinner spinning={loadingTodos.isRequesting} size="large" tip="Loading ...">
          <div className={b('new-todo')}>
            <NewTodo onCreate={createTodo} isLoading={creatingTodo.isRequesting} />
          </div>
          {notification &&
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
