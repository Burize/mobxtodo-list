import * as React from 'react';
import { map } from 'rxjs/operators';

import { useObservable } from 'shared/helpers/reactive';
import { block } from 'shared/helpers/bem';
import { Button, TextInput, TextArea } from 'shared/view/elements';

import './NewTodo.scss';

const b = block('new-todo');

interface IProps {
  isLoading: boolean;
  onCreate(title: string, description: string): void;
}

function NewTodo(props: IProps) {
  const { onCreate, isLoading } = props;

  const [title, setTitle] = useObservable<string, React.ChangeEvent<HTMLInputElement>>((event$) => {
    return event$.pipe(map(event => event.target.value));
  }, 'new todo');

  const [description, setDescription] = useObservable<string, React.ChangeEvent<HTMLTextAreaElement>>((event$) => {
    return event$.pipe(map(event => event.target.value));
  }, 'write something interesting');

  const createTodo = React.useCallback(() => {
    onCreate(title, description);
  }, [title, description, onCreate]);

  return (
    <div className={b()}>
      <TextInput onChange={setTitle} value={title} />
      <TextArea onChange={setDescription} value={description} />
      <Button block disabled={isLoading} type="primary" onClick={createTodo}>Create</Button>
    </div>
  );
}

export default NewTodo;
