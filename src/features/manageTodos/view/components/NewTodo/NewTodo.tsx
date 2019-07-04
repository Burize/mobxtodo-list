import * as React from 'react';

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

  const [title, setTitle] = React.useState('new todo');
  const onTitleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, []);

  const [description, setDescription] = React.useState('write something interesting');
  const onDescriptionChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  }, []);

  const createTodo = React.useCallback(() => {
    onCreate(title, description);
  }, [title, description, onCreate]);

  return (
    <div className={b()}>
      <TextInput onChange={onTitleChange} value={title} />
      <TextArea onChange={onDescriptionChange} value={description} />
      <Button block disabled={isLoading} type="primary" onClick={createTodo}>Create</Button>
    </div>
  );
}

export default NewTodo;
