/** @typedef {typeof __propDef.props}  SearchProps */
/** @typedef {typeof __propDef.events}  SearchEvents */
/** @typedef {typeof __propDef.slots}  SearchSlots */
export default class Search extends SvelteComponentTyped<{
    handler: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SearchProps = typeof __propDef.props;
export type SearchEvents = typeof __propDef.events;
export type SearchSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handler: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
