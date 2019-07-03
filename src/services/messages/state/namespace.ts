import { Message } from 'shared/types/models';

export interface IMessagesState {
  messages: Message[];
  lastMessage: Message | null;
}
