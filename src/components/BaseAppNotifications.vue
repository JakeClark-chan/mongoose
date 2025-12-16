<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-0 z-notifications flex items-end justify-end p-6 md:p-8"
    >
      <div class="w-full max-w-sm">
        <TransitionGroup
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="sm:translate-y-0 sm:translate-x-4 translate-y-2 opacity-0"
          enter-to-class="sm:translate-x-0 translate-y-0 opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="sm:translate-x-0 translate-y-0 opacity-100"
          leave-to-class="sm:translate-y-0 sm:translate-x-4 translate-y-2 opacity-0"
        >
          <div v-for="notification in notifications" :key="notification.id">
            <div
              class="mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl"
            >
              <div
                class="flex w-12 items-center justify-center"
                :class="{
                  'bg-blue-500': notification.color == 'info',
                  'bg-red-500': notification.color == 'danger',
                  'bg-yellow-500': notification.color == 'warning',
                  'bg-green-500': notification.color == 'success',
                }"
              >
                <svg
                  class="h-6 w-6 fill-current text-white"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z"
                  />
                </svg>
              </div>

              <div class="-mx-3 px-4 pt-2 pb-3">
                <div class="mx-3">
                  <h3
                    class="mb-1 font-semibold leading-tight"
                    :class="{
                      'text-blue-500': notification.color == 'info',
                      'text-red-500': notification.color == 'danger',
                      'text-yellow-500': notification.color == 'warning',
                      'text-green-500': notification.color == 'success',
                    }"
                  >
                    {{ notification.title }}
                  </h3>
                  <p class="text-sm leading-tight text-slate-600">
                    {{ notification.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useNotificationsStore } from '@/index';

const notificationsStore = useNotificationsStore();

const notifications = computed(() => {
  return notificationsStore.notifications;
});
</script>
