import { SvelteComponentTyped } from "svelte";
import type { error } from './';
declare const __propDef: {
    props: {
        big?: boolean;
        spellcheck?: boolean;
        height?: string;
        value?: string;
        label?: string;
        icon: string | null;
        required?: boolean;
        errors: error[];
        field: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TextareaProps = typeof __propDef.props;
export type TextareaEvents = typeof __propDef.events;
export type TextareaSlots = typeof __propDef.slots;
export default class Textarea extends SvelteComponentTyped<TextareaProps, TextareaEvents, TextareaSlots> {
}
export {};
