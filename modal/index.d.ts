export { default as Modal } from './Modal.svelte';
export { default as ModalContainer } from './ModalContainer.svelte';
export declare const isActive: import("svelte/store").Writable<boolean>;
export declare const modal: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<{
        component: any;
        props: any;
    }>, invalidate?: (value?: {
        component: any;
        props: any;
    }) => void) => import("svelte/store").Unsubscriber;
    set: (this: void, value: {
        component: any;
        props: any;
    }) => void;
    open: (component: any, props?: any) => void;
    close: () => void;
};
export declare const fadeScale: (node: any, { delay, duration, easing, baseScale }: {
    delay?: number;
    duration?: number;
    easing?: (x: any) => any;
    baseScale?: number;
}) => {
    delay: number;
    duration: number;
    css: (t: any) => string;
};
