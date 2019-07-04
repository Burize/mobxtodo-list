import { ITodo } from 'shared/types/models';

export type ITodoCreationFields = Omit<ITodo, 'id'>;
