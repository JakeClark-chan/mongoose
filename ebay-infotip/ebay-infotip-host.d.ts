import React, { ComponentProps, RefObject, ReactNode } from 'react';
import { Icon } from '../ebay-icon';
import { Variant } from './types';
type InfotipHostProps = ComponentProps<'button'> & {
    icon?: Icon;
    forwardedRef?: RefObject<HTMLAnchorElement & HTMLButtonElement>;
    variant?: Variant;
    children?: (({ icon }: {
        icon: any;
    }) => ReactNode) | ReactNode;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InfotipHostProps, "forwardedRef" | "key" | "icon" | "variant" | keyof React.ButtonHTMLAttributes<HTMLButtonElement>> & React.RefAttributes<React.FC<InfotipHostProps>>>;
export default _default;
//# sourceMappingURL=ebay-infotip-host.d.ts.map