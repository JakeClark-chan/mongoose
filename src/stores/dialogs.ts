import { defineStore } from 'pinia';
import { config } from '@/index';
import { Dialog, DialogOptions } from '../types';

export const useDialogsStore = defineStore('dialogs', {
  state: () => {
    return {
      count: 0,
      dialogs: [] as Dialog[],
    };
  },
  actions: {
    push(options: DialogOptions) {
      this.count++;
      this.dialogs.push({
        id: this.count,
        color: options.color ?? 'info',
        title: options.title,
        message: options.message,
        confirmText: options.confirmText ?? config.i18n.global.t('sui.confirm'),
        cancelText: options.cancelText ?? config.i18n.global.t('sui.cancel'),
        closeOnOutsideClick: options.closeOnOutsideClick ?? true,
        onConfirm:
          options.onConfirm ??
          function () {
            return;
          },
        onCancel:
          options.onCancel ??
          function () {
            return;
          },
      });
    },
    remove(dialog: Dialog) {
      this.dialogs.splice(
        this.dialogs.findIndex((a) => a.id === dialog.id),
        1
      );
    },
    clear() {
      this.dialogs = [];
    },
  },
});
