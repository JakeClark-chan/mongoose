import axios, { AxiosInstance } from 'axios';
import { App } from 'vue';
import * as components from './components';
import QueryString from 'qs';
import { createI18n, I18n } from 'vue-i18n';
import en from '@/lang/en.json';
import fr from '@/lang/fr.json';
import { useDialogsStore } from './stores/dialogs';
import { useNotificationsStore } from './stores/notifications';
import { useSystemAlertStore } from './stores/systemAlerts';
import { useClickOutside } from './composables/clickOutside';
import { useField } from './composables/field';

const messages = { en, fr };

import './assets/main.css';
import { Locales } from './types';

export interface Options {
  // eslint-disable-next-line @typescript-eslint/ban-types
  i18n?: I18n<typeof messages, {}, {}, string, true>;
  http?: AxiosInstance;
  upload_url?: string;
  locales?: Locales;
  formatQueryString?: (params: Record<string, any>) => string;
  parseQueryString?: (params: string) => Record<string, any>;
}

const config = {
  i18n: createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, fr },
  }),
  http: axios.create(),
  locales: {
    en: 'English',
    fr: 'Français',
  } as Locales,
  upload_url: '/api/upload',
  formatQueryString(params: Record<string, any>) {
    return QueryString.stringify(params, {
      arrayFormat: 'comma',
      encode: import.meta.env.PROD ? true : false,
    });
  },
  parseQueryString(params: string): Record<string, any> {
    return QueryString.parse(params);
  },
};

function install(app: App, options?: Options) {
  for (const key in components) {
    // @ts-expect-error Will throw
    app.component(key, components[key]);
  }

  if (options?.i18n) {
    config.i18n = options.i18n;
  }

  if (options?.http) {
    config.http = options.http;
  }

  if (options?.locales) {
    config.locales = options.locales;
  }

  if (options?.upload_url) {
    config.upload_url = options.upload_url;
  }

  if (options?.formatQueryString) {
    config.formatQueryString = options.formatQueryString;
  }

  if (options?.parseQueryString) {
    config.parseQueryString = options.parseQueryString;
  }
}

export default { install };

export * from './components';
export * from './constants';
export * from './utils';

export { messages };

export { config };

export { useDialogsStore };
export { useNotificationsStore };
export { useSystemAlertStore };
export { useClickOutside };
export { useField };
