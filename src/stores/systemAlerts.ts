import { defineStore } from 'pinia';
import { SystemAlert, SystemAlertOptions } from '../types';

export const useSystemAlertStore = defineStore('systemAlerts', {
  state: () => {
    return {
      count: 0,
      systemAlerts: [] as SystemAlert[],
    };
  },
  actions: {
    push(systemAlert: SystemAlertOptions) {
      this.count++;
      this.systemAlerts.push({
        id: this.count,
        color: systemAlert.color ?? 'info',
        message: systemAlert.message,
        to: systemAlert.to,
        action: systemAlert.action,
        closable: systemAlert.closable ?? false,
      });
    },
    remove(systemAlert: SystemAlert) {
      this.systemAlerts.splice(
        this.systemAlerts.findIndex((a) => a.id === systemAlert.id),
        1
      );
    },
    clear() {
      this.systemAlerts = [];
    },
  },
});
