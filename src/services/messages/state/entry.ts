import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Message } from 'shared/types/models';

import { initialDataState } from './initial';
import { IMessagesState } from './namespace';

export const messages$ = new Subject<Message>();

const reduceState = (state: IMessagesState, message: Message): IMessagesState => {
  return { ...state, messages: state.messages.concat(message), lastMessage: message };
};

export const dataState$ = messages$.pipe(
  scan((prevState, action) => {
    return reduceState(prevState, action);
  }, initialDataState),
);
