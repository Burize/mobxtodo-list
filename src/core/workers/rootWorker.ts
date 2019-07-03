import { Message, NotificationMessage } from 'shared/types/models';

const _self: ServiceWorkerGlobalScope = self as any;

_self.addEventListener('push', async (event) => {
  try {
    const pushPayload = event.data && event.data.json();
    if (!pushPayload) {
      throw new Error('empty push payload');
    }

    const { title, body } = pushPayload as NotificationMessage['payload'];
    const message: Message = { type: 'notification', payload: { title: String(title), body: String(body) } };

    const clients = await _self.clients.matchAll({ type: 'window' });
    clients.forEach(client => {
      client.postMessage(message);
    });
  } catch (e) {
    console.error(e);
  }
});
