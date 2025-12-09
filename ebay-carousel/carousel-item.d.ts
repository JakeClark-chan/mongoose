import React, { ComponentProps, RefObject } from 'react';
import { ListItemRef } from './types';
type ListProps = ComponentProps<'li'>;
type CarouselItemProps = ListProps & {
    slideWidth?: number;
    offset?: number;
    className?: string;
    forwardedRef?: RefObject<ListItemRef>;
};
declare const _default: React.ForwardRefExoticComponent<Pick<CarouselItemProps, "forwardedRef" | "key" | "offset" | "slideWidth" | keyof React.LiHTMLAttributes<HTMLLIElement>> & React.RefAttributes<React.FC<CarouselItemProps>>>;
export default _default;
//# sourceMappingURL=carousel-item.d.ts.map