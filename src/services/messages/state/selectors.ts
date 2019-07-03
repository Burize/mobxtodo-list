import { map } from 'rxjs/operators';

import { dataState$ } from './entry';

export function selectAllMessages() {
  return dataState$.pipe(
    map(state => state.messages),
  );
}

export function selectLastMessage() {
  return dataState$.pipe(
    map(state => state.lastMessage),
  );
}
