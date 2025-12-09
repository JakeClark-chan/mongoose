import React, { ComponentProps, RefObject } from 'react';
import { TooltipType } from './types';
export type TooltipProps = ComponentProps<'span'> & {
    type?: TooltipType;
    isExpanded?: boolean;
    forwardedRef?: RefObject<HTMLSpanElement>;
};
declare const _default: React.ForwardRefExoticComponent<Pick<TooltipProps, "forwardedRef" | "type" | "key" | "isExpanded" | keyof React.HTMLAttributes<HTMLSpanElement>> & React.RefAttributes<React.FC<TooltipProps>>>;
export default _default;
//# sourceMappingURL=tooltip.d.ts.map