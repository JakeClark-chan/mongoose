export { default as Loading } from './Loading.svelte';
export declare const loading: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<{
        active: boolean;
        message: string;
        submessage: string;
    }>, invalidate?: (value?: {
        active: boolean;
        message: string;
        submessage: string;
    }) => void) => import("svelte/store").Unsubscriber;
    set: (this: void, value: {
        active: boolean;
        message: string;
        submessage: string;
    }) => void;
    update: (this: void, updater: import("svelte/store").Updater<{
        active: boolean;
        message: string;
        submessage: string;
    }>) => void;
    start: (message?: string, submessage?: string) => void;
    stop: () => void;
};
