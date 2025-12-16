import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        process: boolean | null;
        bootstrap: boolean | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LoadingProps = typeof __propDef.props;
export type LoadingEvents = typeof __propDef.events;
export type LoadingSlots = typeof __propDef.slots;
export default class Loading extends SvelteComponentTyped<LoadingProps, LoadingEvents, LoadingSlots> {
}
export {};
