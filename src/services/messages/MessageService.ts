import { BindAll } from 'lodash-decorators';

import { IMessageEvent, MessageType } from 'shared/types/models';

import { messages$ } from './state';

const messageTypes: MessageType[] = ['notification'];
@BindAll()
export class MessageService {

  constructor() {
    this.init();
  }
  public init() {
    navigator.serviceWorker.addEventListener('message', this.receiveMessage);
  }

  private receiveMessage(event: IMessageEvent) {
    if (!event.data || !messageTypes.includes(event.data.type)) {
      return;
    }
    messages$.next(event.data);
  }
}

export default new MessageService();
