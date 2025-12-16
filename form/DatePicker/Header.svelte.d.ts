import { SvelteComponentTyped } from "svelte";
import type DateHandler from './DateHandler';
import type { locale } from '../';
declare const __propDef: {
    props: {
        handler: DateHandler;
        locale: locale;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type HeaderProps = typeof __propDef.props;
export type HeaderEvents = typeof __propDef.events;
export type HeaderSlots = typeof __propDef.slots;
export default class Header extends SvelteComponentTyped<HeaderProps, HeaderEvents, HeaderSlots> {
}
export {};
