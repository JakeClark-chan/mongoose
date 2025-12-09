import React, { ComponentProps, RefObject } from 'react';
import { Size } from '../ebay-button';
type HTMLAnchorProps = ComponentProps<'a'>;
type Props = HTMLAnchorProps & {
    fluid?: boolean;
    truncate?: boolean;
    size?: Size;
    forwardedRef?: RefObject<HTMLAnchorElement>;
};
declare const _default: React.ForwardRefExoticComponent<Pick<Props, "forwardedRef" | "key" | "size" | "fluid" | "truncate" | keyof React.AnchorHTMLAttributes<HTMLAnchorElement>> & React.RefAttributes<React.FC<Props>>>;
export default _default;
//# sourceMappingURL=cta-button.d.ts.map