import { ComponentProps, FC } from 'react';
export type EbayBadgeType = 'menu' | 'icon' | 'img';
export type EbayBadgeProps = ComponentProps<'span'> & {
    type?: EbayBadgeType;
    number: number | string;
};
declare const EbayBadge: FC<EbayBadgeProps>;
export default EbayBadge;
//# sourceMappingURL=badge.d.ts.map