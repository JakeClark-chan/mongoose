import { MouseEvent } from 'react';
export interface IconButtonProps {
    className?: string;
    disabled?: boolean;
    icon: JSX.Element;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
