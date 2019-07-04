import { observable, action, computed } from 'mobx';
import { BindAll } from 'lodash-decorators';

import { IMessageEvent, MessageType, Message } from 'shared/types/models';

const messageTypes: MessageType[] = ['notification'];

@BindAll()
export class MessageService {
  @observable public messages: Message[] = [];

  constructor() {
    this.init();
  }
  public init() {
    navigator.serviceWorker.addEventListener('message', this.receiveMessage);
  }

  @action private receiveMessage(event: IMessageEvent) {
    if (!event.data || !messageTypes.includes(event.data.type)) {
      return;
    }

    this.messages = this.messages.concat(event.data);
  }

  @computed get lastMessage() {
    return this.messages.length !== 0 ? this.messages[this.messages.length - 1] : null;
  }
}

export default new MessageService();
