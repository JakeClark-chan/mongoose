import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ModalContainerProps = typeof __propDef.props;
export type ModalContainerEvents = typeof __propDef.events;
export type ModalContainerSlots = typeof __propDef.slots;
export default class ModalContainer extends SvelteComponentTyped<ModalContainerProps, ModalContainerEvents, ModalContainerSlots> {
}
export {};
