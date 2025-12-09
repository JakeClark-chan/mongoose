import { SyntheticEvent } from 'react';
import { IconSize } from '../../../icons/Icon/interfaces';
export interface HeartButtonProps {
    className?: string;
    isActive?: boolean;
    onClick: (event: SyntheticEvent) => void;
    size?: IconSize;
}
