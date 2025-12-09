import { ComponentProps, FC } from 'react';
import { EbayMenuType } from './types';
export type MenuItemProps = ComponentProps<'div'> & {
    type?: EbayMenuType;
    focused?: boolean;
    tabIndex?: number;
    checked?: boolean;
    value?: string;
    disabled?: boolean;
    badgeNumber?: number;
    badgeAriaLabel?: string;
};
declare const EbayMenuItem: FC<MenuItemProps>;
export default EbayMenuItem;
//# sourceMappingURL=menu-item.d.ts.map