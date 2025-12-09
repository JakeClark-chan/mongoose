import { FC, HTMLProps, RefObject, ReactElement, MouseEventHandler, ReactNode, KeyboardEventHandler } from 'react';
import { TransitionElement } from './animation';
export type WindowType = 'compact';
type ClassPrefix = 'fullscreen-dialog' | 'lightbox-dialog' | 'panel-dialog' | 'drawer-dialog' | 'toast-dialog' | 'alert-dialog' | 'confirm-dialog' | 'snackbar-dialog';
type ButtonPosition = 'top' | 'right' | 'bottom' | 'left' | 'hidden';
export interface DialogBaseProps<T> extends HTMLProps<T> {
    baseEl?: 'div' | 'span' | 'aside';
    open?: boolean;
    classPrefix?: ClassPrefix;
    windowClass?: string;
    windowType?: WindowType;
    header?: ReactElement;
    footer?: ReactElement;
    actions?: ReactElement;
    isModal?: boolean;
    top?: ReactElement;
    buttonPosition?: ButtonPosition;
    ariaLabelledby?: string;
    a11yCloseText?: string;
    onOpen?: () => void;
    onCloseBtnClick?: MouseEventHandler & KeyboardEventHandler;
    onBackgroundClick?: MouseEventHandler;
    mainId?: string;
    ignoreEscape?: boolean;
    closeButton?: ReactElement;
    previousButton?: ReactElement;
    focus?: RefObject<HTMLAnchorElement & HTMLButtonElement>;
    animated?: boolean;
    closeButtonClass?: string;
    transitionElement?: TransitionElement;
    children?: ReactNode;
}
export declare const DialogBase: FC<DialogBaseProps<HTMLElement>>;
export default DialogBase;
//# sourceMappingURL=dialogBase.d.ts.map