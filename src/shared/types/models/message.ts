export interface IMessageEvent extends MessageEvent {
  data: Message;
}

export type Message = NotificationMessage;

export type NotificationMessage = IMessage<'notification', {
  title: string;
  body: string;
}>;

export interface IMessage<T extends MessageType, P extends object> {
  type: T;
  payload: P;
}

export type MessageType = 'notification';
