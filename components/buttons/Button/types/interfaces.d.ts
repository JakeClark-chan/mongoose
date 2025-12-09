import { MouseEvent } from 'react';
import { Link } from '../../../cards/CartItemNext/types/interfaces';
import { ButtonSize, ButtonIconPosition, ButtonTheme } from './types';
export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
    iconPosition?: ButtonIconPosition;
    id?: string;
    isLoading?: boolean;
    linkProps?: Link;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    size?: ButtonSize;
    text?: string;
    theme?: ButtonTheme;
}
