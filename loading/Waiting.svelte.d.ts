import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type WaitingProps = typeof __propDef.props;
export type WaitingEvents = typeof __propDef.events;
export type WaitingSlots = typeof __propDef.slots;
export default class Waiting extends SvelteComponentTyped<WaitingProps, WaitingEvents, WaitingSlots> {
}
export {};
