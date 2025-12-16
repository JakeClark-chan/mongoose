/** @typedef {typeof __propDef.props}  ThFilterProps */
/** @typedef {typeof __propDef.events}  ThFilterEvents */
/** @typedef {typeof __propDef.slots}  ThFilterSlots */
export default class ThFilter extends SvelteComponentTyped<{
    handler: any;
    filterBy?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ThFilterProps = typeof __propDef.props;
export type ThFilterEvents = typeof __propDef.events;
export type ThFilterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handler: any;
        filterBy?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
