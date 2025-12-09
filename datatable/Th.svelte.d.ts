/** @typedef {typeof __propDef.props}  ThProps */
/** @typedef {typeof __propDef.events}  ThEvents */
/** @typedef {typeof __propDef.slots}  ThSlots */
export default class Th extends SvelteComponentTyped<{
    handler: any;
    orderBy?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ThProps = typeof __propDef.props;
export type ThEvents = typeof __propDef.events;
export type ThSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handler: any;
        orderBy?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
