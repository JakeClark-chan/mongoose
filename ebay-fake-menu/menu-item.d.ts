import { ComponentProps, FC } from 'react';
export type EbayMenuItemType = 'button';
export type EbayFakeMenuItemProps = Omit<ComponentProps<'a'>, 'onKeyDown' | 'onMouseDown'> & Omit<ComponentProps<'button'>, 'onKeyDown' | 'onMouseDown'> & {
    current?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    type?: EbayMenuItemType;
    badgeNumber?: number;
    badgeAriaLabel?: string;
};
declare const EbayMenuItem: FC<EbayFakeMenuItemProps>;
export default EbayMenuItem;
//# sourceMappingURL=menu-item.d.ts.map