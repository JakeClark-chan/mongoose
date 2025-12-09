import React from 'react';
import { Key } from './types';
type Callback = () => void;
export declare function handleEnterKeydown(e: React.KeyboardEvent, callback: Callback): void;
export declare function handleActionKeydown(e: React.KeyboardEvent, callback: Callback): void;
export declare function isActionKey(key: Key): boolean;
export declare function handleEscapeKeydown(e: React.KeyboardEvent, callback: Callback): void;
export declare function handleUpDownArrowsKeydown(e: React.KeyboardEvent, callback: Callback): void;
export declare function handleLeftRightArrowsKeydown(e: React.KeyboardEvent, callback: Callback): void;
export declare function handleTextInput(e: React.KeyboardEvent, callback: Callback): void;
export declare function preventDefaultIfHijax(e: React.KeyboardEvent, hijax: boolean): void;
type Handler = (e: KeyboardEvent) => void;
export declare function addEventListener(_: unknown, handler: Handler): void;
export declare function removeEventListener(_: unknown, handler: Handler): void;
export declare function handleResize(e: KeyboardEvent): void;
export declare function wrapEvent(parentEventHandler: Handler, localEventHandler: Handler): (e: KeyboardEvent) => void;
export {};
//# sourceMappingURL=index.d.ts.map