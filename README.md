## REACTIVE TODO LIST

Common todo list with create/delete operations. Also, you can receive some push-message.


### Used features

- [RxJS](https://rxjs-dev.firebaseapp.com/) as stream manager;
- Typescript fro type checking;
- [Axios-observable](https://github.com/zhaosiyang/axios-observable) for handle http actions;
- [Antd](https://github.com/ant-design/ant-design/) as components kits.
- ServiceWorker for handle push notifications.

There is Service worker with push event handler. At that moment, on server side is not realize push notification. However you can send push directly from chrome devtools (Application tab).

Acceptable format is JSON, like:

```json
{"title": "title from push", "body": "body from push"}
```

---
You can test server side error via creating todo with `error` title.

### Project launch
For working you need [back-end rest server](https://github.com/Burize/reactive-todo-list-server). Clone it and launch.

### NPM scripts
- ```npm i``` for installing dependencies
- ```npm run dev``` for development environment in watch mode
- ```npm run prod``` for production environment in watch mode
- ```npm run analyze:dev``` for bundle analyzing
