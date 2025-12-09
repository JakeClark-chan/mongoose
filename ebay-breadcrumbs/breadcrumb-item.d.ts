import { ComponentProps, FC, MouseEventHandler, ReactNode } from 'react';
type ItemAttributes = ComponentProps<'a'> & ComponentProps<'button'>;
type BreadcrumbItemProps = ItemAttributes & {
    children: ReactNode;
    tag?: 'a' | 'button';
    href?: string;
    isLastItem?: boolean;
    onClick?: MouseEventHandler;
    _sp?: string;
    navsrc?: string;
};
declare const BreadcrumbItem: FC<BreadcrumbItemProps>;
export default BreadcrumbItem;
//# sourceMappingURL=breadcrumb-item.d.ts.map