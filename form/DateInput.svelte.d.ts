import { SvelteComponentTyped } from "svelte";
import { type Format } from '../date';
import type { error } from './';
declare const __propDef: {
    props: {
        big?: boolean;
        value?: string;
        label: string | undefined;
        icon: string | undefined;
        required?: boolean;
        errors: error[];
        field: string;
        format: Format;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DateInputProps = typeof __propDef.props;
export type DateInputEvents = typeof __propDef.events;
export type DateInputSlots = typeof __propDef.slots;
export default class DateInput extends SvelteComponentTyped<DateInputProps, DateInputEvents, DateInputSlots> {
}
export {};
