import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { PUSH_KEY_PUBLIC } from './constants';
import urlB64ToUint8Array from 'shared/helpers/urlB64ToUint8Array';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const swRegistration: ServiceWorkerRegistration = await runtime.register();
    await subscribeForNotifications(swRegistration);
  });
}

async function subscribeForNotifications(swRegistration: ServiceWorkerRegistration) {
  return swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(PUSH_KEY_PUBLIC),
  });
}
