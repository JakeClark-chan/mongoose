import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BootstrapProps = typeof __propDef.props;
export type BootstrapEvents = typeof __propDef.events;
export type BootstrapSlots = typeof __propDef.slots;
export default class Bootstrap extends SvelteComponentTyped<BootstrapProps, BootstrapEvents, BootstrapSlots> {
}
export {};
