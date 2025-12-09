/** @typedef {typeof __propDef.props}  RangeSliderProps */
/** @typedef {typeof __propDef.events}  RangeSliderEvents */
/** @typedef {typeof __propDef.slots}  RangeSliderSlots */
export default class RangeSlider extends SvelteComponentTyped<{
    range: any;
    big?: boolean;
    values?: number[];
    max?: number;
    all?: any;
    id?: any;
    float?: boolean;
    prefix?: string;
    disabled?: boolean;
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
    formatter?: (v: any, i: any, p: any) => any;
    slider?: any;
    pushy?: boolean;
    pips?: boolean;
    handleFormatter?: (v: any, i: any, p: any) => any;
    precision?: number;
    springValues?: {
        stiffness: number;
        damping: number;
    };
}, {
    start: CustomEvent<any>;
    stop: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type RangeSliderProps = typeof __propDef.props;
export type RangeSliderEvents = typeof __propDef.events;
export type RangeSliderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        range: any;
        big?: boolean;
        values?: number[];
        max?: number;
        all?: any;
        id?: any;
        float?: boolean;
        prefix?: string;
        disabled?: boolean;
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
        formatter?: (v: any, i: any, p: any) => any;
        slider?: any;
        pushy?: boolean;
        pips?: boolean;
        handleFormatter?: (v: any, i: any, p: any) => any;
        precision?: number;
        springValues?: {
            stiffness: number;
            damping: number;
        };
    };
    events: {
        start: CustomEvent<any>;
        stop: CustomEvent<any>;
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
