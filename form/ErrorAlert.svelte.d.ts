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
export type ErrorAlertProps = typeof __propDef.props;
export type ErrorAlertEvents = typeof __propDef.events;
export type ErrorAlertSlots = typeof __propDef.slots;
export default class ErrorAlert extends SvelteComponentTyped<ErrorAlertProps, ErrorAlertEvents, ErrorAlertSlots> {
}
export {};
