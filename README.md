

<p align="center">
<img src="https://sprintify.witify.io/img/logo/logo-side.svg" width="190" />
</p>

<p align="center">
<a href="https://badge.fury.io/js/sprintify-ui"><img src="https://badge.fury.io/js/sprintify-ui.svg" alt="npm version" height="18"></a>
<img src="https://api.netlify.com/api/v1/badges/e95b44db-1c89-450d-99e1-887c9b261438/deploy-status" height="18" />
</p>

## About Sprintify UI

Sprintify UI is a Vue 3 components library for Vite projects using a Laravel backend.


**Storybook Documentation**
https://sprintify-ui-storybook.netlify.app

## Getting started

### Install

```bash
npm i sprintify-ui --save
```

### Peer dependencies:

`sprintify-ui` is highly opinionated and requires multiple dependencies :

`@vueuse/core`
`axios`
`lodash`
`luxon`
`pinia`
`qs`
`tailwindcss`
`vue`
`vue-i18n`
`vue-router`

To install them all :

```bash
npm i @vueuse/core axios lodash luxon pinia qs tailwindcss vue vue-i18n vue-router --save
```

### Basic Configuration

```ts
import axios from "axios";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import SprintifyUI from "sprintify-ui";
import { messages as SprintifyUIMessages } from "sprintify-ui";

// Import your TailwindCSS *before* importing Sprintify UI CSS
import "../css/tailwind.css";

// Import Sprintify UI CSS
import "sprintify-ui/dist/style.css";

/** Axios */

const http = axios.create({
  credentials: true,
}),

/** Vue i18n */

const messages = {
  en: {},
  fr: {},
};

messages.en.sui = SprintifyUIMessages.en.sui;
messages.fr.sui = SprintifyUIMessages.fr.sui;

type MessageSchema = typeof messages.en;

const i18n = createI18n<[MessageSchema], 'en' | 'fr', false>({
  locale: "en",
  legacy: false,
  messages,
});

/** Vue Router */

const router = createRouter({
  routes: [],
  history: createWebHistory("admin"),
});

/** Vue Plugins */

// Import router and i18n *before* importing Sprintify UI plugin
app.use(i18n);
app.use(router);
app.use(createPinia());

// Import Sprintify UI plugin
app.use(SprintifyUI, {
  i18n, // Import your i18n instance 
  http, // Default axios instance for <BaseAutocompleteFetch>, <BaseDataIterator>, etc...
  upload_url: "/api/files/upload", // Default upload URL for <BaseFileUploader>
});

app.mount("#app");

```

### TailwindCSS

Make sure you have all the required tailwindCSS plugins installed:

```bash
npm i tailwindcss @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp -D
```

#### Update tailwind.config.js

Update your content list :

```js
{
  content: [
    //...,
    "./node_modules/sprintify-ui/src/**/*.ts",
    "./node_modules/sprintify-ui/src/**/*.js",
    "./node_modules/sprintify-ui/src/**/*.vue",
  ],
}
```

Update your plugin list :

```js
plugins: [
  //...,
  require("sprintify-ui/tailwindcss"),
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
  require("@tailwindcss/aspect-ratio"),
  require("@tailwindcss/line-clamp"),
],
```

### Configure using unplugin-vue-components

Add a custom resolver

```js
Components({
  resolvers: [
    (componentName) => {
      if (componentName.startsWith("Base"))
        return { name: componentName, from: "sprintify-ui" };
    },
  ],
}),
```

### Notifications and Dialogs

To use notification and dialogs, you main layout must contain the `<BaseAppNotifications>` and `<BaseAppDialogs>` components.
These components will observe the pinia store and render dialogs and notifications.

```vue
<template>
  <RouterView></RouterView>
  <BaseAppNotifications />
  <BaseAppDialogs />
</template>

<script lang="ts" setup>
</script>
```

#### Custom notifications and dialogs

You may 100% customize the look and feel of dialogs and notifications by removing `<BaseApp>` and instead create you own render logic. Here's a simple example to render notifications:

```vue
<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-0 flex items-end justify-end p-6 md:p-8">
      <div class="w-full max-w-sm">
        <div v-for="notification in notifications" :key="notification.id">
          <h2>{{ notification.title }}</h2>
          <p>{{ notification.text }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useNotificationsStore } from 'sprintify-ui';

const notificationsStore = useNotificationsStore();

const notifications = computed(() => {
  return notificationsStore.notifications;
});
</script>
```

## Using components

All components are globally available, you can use them without importation:

```vue
<template>
  <BaseAlert title="Test" color="danger"></BaseAlert>
</template>

<script lang="ts" setup>
</script>  
```