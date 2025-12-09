import { ReactNode } from 'react';
export interface ButtonProps {
    className?: string;
    noCarret?: boolean;
}
declare type RenderProps = {
    onToggle: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    open: boolean;
};
export declare type Render = ({ open, onToggle }: RenderProps) => ReactNode;
export declare type OnClickFunction = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
export interface DetailsProps {
    children: ReactNode;
    className?: string;
    defaultOpen?: boolean;
    disabled?: boolean;
    onClickOutside?: OnClickFunction;
    onToggle?: OnClickFunction;
    open?: boolean;
    render?: Render;
}
export interface MenuProps {
    className?: string;
    direction?: 'c' | 'tl' | 'l' | 'br' | 'b' | 'bl' | 'r';
}
export interface MenuItemProps {
    className?: string;
    onClick?: OnClickFunction;
    onClose?: OnClickFunction;
}
export interface DropdownProps extends MenuProps, DetailsProps {
    children: ReactNode;
    className?: string;
}
export {};
