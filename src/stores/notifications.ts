import { defineStore } from 'pinia';
import { Notification, NotificationOptions } from '../types';

export const useNotificationsStore = defineStore('notifications', {
  state: () => {
    return {
      count: 0,
      notifications: [] as Notification[],
      timeouts: {} as Record<number, number>,
    };
  },
  actions: {
    push(options: NotificationOptions) {
      this.count++;

      const id = this.count;

      const notification = {
        id: id,
        color: options.color ?? 'info',
        title: options.title,
        text: options.text,
        duration: options.duration ?? 3000,
      };

      this.notifications.push(notification);

      this.timeouts[id] = setTimeout(() => {
        this.remove(notification);
      }, notification.duration);
    },
    remove(notification: Notification) {
      this.notifications.splice(
        this.notifications.findIndex((n) => n.id === notification.id),
        1
      );
      clearTimeout(this.timeouts[notification.id]);
    },
    clear() {
      this.notifications = [];
      Object.values(this.timeouts).forEach((timeout) => {
        clearTimeout(timeout);
      });
      this.timeouts = [];
    },
  },
});
