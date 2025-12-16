import { SvelteComponentTyped } from "svelte";
import type { error } from './';
declare const __propDef: {
    props: {
        big?: boolean;
        spellcheck?: boolean;
        value?: string;
        label?: string;
        password?: boolean;
        number?: boolean;
        icon: string | null;
        required?: boolean;
        errors: error[];
        field: string | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponentTyped<InputProps, InputEvents, InputSlots> {
}
export {};
