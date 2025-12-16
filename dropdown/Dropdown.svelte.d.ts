import { SvelteComponentTyped } from "svelte";
import type { Placement } from '@popperjs/core';
declare const __propDef: {
    props: {
        position?: Placement;
        preventClosing?: boolean;
        fixedWidth?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        content: {};
    };
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponentTyped<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
