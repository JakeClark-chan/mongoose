import { FC, ReactNode } from 'react';
export interface LinkComponent {
    page: number;
}
export interface PaginatorProps {
    className?: string;
    currentPage?: number;
    linkComponent: FC<LinkComponent>;
    maxPages?: number;
    quantity?: number;
    text?: string;
    totalPages: number;
}
export interface PaginatorItemProps {
    className?: string;
    icon?: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    text?: string;
}
