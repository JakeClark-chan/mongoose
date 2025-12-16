/** @typedef {typeof __propDef.props}  DatatableProps */
/** @typedef {typeof __propDef.events}  DatatableEvents */
/** @typedef {typeof __propDef.slots}  DatatableSlots */
export default class Datatable extends SvelteComponentTyped<{
    handler: any;
    withPagination?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type DatatableProps = typeof __propDef.props;
export type DatatableEvents = typeof __propDef.events;
export type DatatableSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handler: any;
        withPagination?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
