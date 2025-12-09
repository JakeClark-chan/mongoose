import { ComponentProps, FC } from 'react';
import { EbayKeyboardEventHandler, EbayMouseEventHandler } from '../common/event-utils/types';
import { EbayButtonProps } from '../ebay-button';
export type EbayFakeMenuButtonVariant = 'overflow' | 'form' | 'button';
export type EbayFakeMenuButtonProps = {
    a11yText?: string;
    noToggleIcon?: boolean;
    expanded?: boolean;
    fixWidth?: boolean;
    reverse?: boolean;
    variant?: EbayFakeMenuButtonVariant;
    className?: string;
    onCollapse?: () => void;
    onExpand?: () => void;
    text?: string;
    onSelect?: EbayMouseEventHandler<HTMLAnchorElement, {
        index: number;
    }>;
    onKeyDown?: EbayKeyboardEventHandler<HTMLElement>;
    onMouseDown?: EbayMouseEventHandler<HTMLAnchorElement, {
        index: number;
    }>;
};
type ButtonProps = Omit<EbayButtonProps, 'variant' | 'onKeyDown' | 'onMouseDown'> & Omit<ComponentProps<'button'>, 'onKeyDown' | 'onMouseDown' | 'onSelect'> & Omit<ComponentProps<'a'>, 'onKeyDown' | 'onMouseDown' | 'onSelect'>;
type Props = ButtonProps & EbayFakeMenuButtonProps;
declare const EbayMenuButton: FC<Props>;
export default EbayMenuButton;
//# sourceMappingURL=menu-button.d.ts.map