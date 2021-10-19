import { NOTIFICATION } from '../constants';

export default function notify(title: string, message: string, icon: string) {
  console.log('notification: ', title, message);
  return chrome.notifications.create('step_notifier', {
    type: 'basic',
    title: title,
    message: message,
    iconUrl: icon || NOTIFICATION.DEFAULT_ICON,
  });
}
