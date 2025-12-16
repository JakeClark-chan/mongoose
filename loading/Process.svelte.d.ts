import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ProcessProps = typeof __propDef.props;
export type ProcessEvents = typeof __propDef.events;
export type ProcessSlots = typeof __propDef.slots;
export default class Process extends SvelteComponentTyped<ProcessProps, ProcessEvents, ProcessSlots> {
}
export {};
