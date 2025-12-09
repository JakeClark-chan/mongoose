import { ReactNode } from 'react';
export interface DropdownNextProps {
    arrowIcon?: ReactNode;
    className?: string;
    icon?: ReactNode;
    isDisabled?: boolean;
    isOpenByDefault?: boolean;
    renderTitle?: () => ReactNode;
    title?: string;
}
