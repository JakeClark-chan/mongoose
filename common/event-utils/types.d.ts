import { ChangeEvent, KeyboardEvent, MouseEvent, FocusEvent, SyntheticEvent } from 'react';
type ModifierKeys = 'Alt' | 'AltGraph' | 'Control' | 'Shift' | 'CapsLock' | 'Meta';
type NavigationKeys = 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'Enter' | 'Tab' | ' ' | 'Escape' | 'End' | 'Home' | 'PageDown' | 'PageUp';
type NavigationKeysEdge = 'Down' | 'Left' | 'Right' | 'Up' | 'Esc';
export type Key = ModifierKeys | NavigationKeys | NavigationKeysEdge;
type BaseEventHandler<E extends SyntheticEvent<any>, P> = (event: E, props?: P) => void;
export type EbayEventHandler<ElementType = Element, PropsObject = Record<string, any>> = BaseEventHandler<SyntheticEvent<ElementType>, PropsObject>;
export type EbayMouseEventHandler<ElementType = Element, PropsObject = Record<string, any>> = BaseEventHandler<MouseEvent<ElementType>, PropsObject>;
export type EbayKeyboardEventHandler<ElementType = Element, PropsObject = Record<string, any>> = BaseEventHandler<KeyboardEvent<ElementType>, PropsObject>;
export type EbayChangeEventHandler<ElementType = Element, PropsObject = Record<string, any>> = BaseEventHandler<ChangeEvent<ElementType>, PropsObject>;
export type EbayFocusEventHandler<ElementType = Element, PropsObject = Record<string, any>> = BaseEventHandler<FocusEvent<ElementType>, PropsObject>;
export {};
//# sourceMappingURL=types.d.ts.map