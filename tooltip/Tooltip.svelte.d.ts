import { SvelteComponentTyped } from "svelte";
import type { Placement } from '@popperjs/core';
declare const __propDef: {
    props: {
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
        left?: boolean;
        position?: Placement;
        content?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TooltipProps = typeof __propDef.props;
export type TooltipEvents = typeof __propDef.events;
export type TooltipSlots = typeof __propDef.slots;
export default class Tooltip extends SvelteComponentTyped<TooltipProps, TooltipEvents, TooltipSlots> {
}
export {};
