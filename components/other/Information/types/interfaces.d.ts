import { ReactChild, ReactElement } from 'react';
export interface InformationProps {
    children?: ReactChild;
    className?: string;
    description: string;
    header: string;
    id?: number;
    isMobile?: boolean;
    onDelete: () => void;
    onHeartButtonClick?: () => void;
    onLinkClick?: () => void;
    orderNumber?: string;
    path?: string;
    status: string;
    type: string;
    typeName?: string;
    withLink?: ReactElement<any, any>;
}
