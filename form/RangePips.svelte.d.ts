/** @typedef {typeof __propDef.props}  RangePipsProps */
/** @typedef {typeof __propDef.events}  RangePipsEvents */
/** @typedef {typeof __propDef.slots}  RangePipsSlots */
export default class RangePips extends SvelteComponentTyped<{
    values?: number[];
    max?: number;
    all?: boolean;
    focus?: any;
    prefix?: string;
    disabled?: boolean;
    range?: boolean;
    min?: number;
    step?: number;
    vertical?: boolean;
    reversed?: boolean;
    hoverable?: boolean;
    pipstep?: any;
    first?: any;
    last?: any;
    rest?: any;
    suffix?: string;
    formatter?: (v: any, i: any) => any;
    orientationStart?: any;
    percentOf?: any;
    moveHandle?: any;
    fixFloat?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type RangePipsProps = typeof __propDef.props;
export type RangePipsEvents = typeof __propDef.events;
export type RangePipsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        values?: number[];
        max?: number;
        all?: boolean;
        focus?: any;
        prefix?: string;
        disabled?: boolean;
        range?: boolean;
        min?: number;
        step?: number;
        vertical?: boolean;
        reversed?: boolean;
        hoverable?: boolean;
        pipstep?: any;
        first?: any;
        last?: any;
        rest?: any;
        suffix?: string;
        formatter?: (v: any, i: any) => any;
        orientationStart?: any;
        percentOf?: any;
        moveHandle?: any;
        fixFloat?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
