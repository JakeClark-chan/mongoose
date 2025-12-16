import { SvelteComponentTyped } from "svelte";
import type { error } from './';
declare const __propDef: {
    props: {
        errors: error[];
        field: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ErrorMessageProps = typeof __propDef.props;
export type ErrorMessageEvents = typeof __propDef.events;
export type ErrorMessageSlots = typeof __propDef.slots;
export default class ErrorMessage extends SvelteComponentTyped<ErrorMessageProps, ErrorMessageEvents, ErrorMessageSlots> {
}
export {};
