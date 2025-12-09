import { SyntheticEvent } from 'react';
import { ButtonSize } from '../../Button';
export interface LinkProps {
    className?: string;
    onClick: (e: SyntheticEvent) => void;
    size?: ButtonSize;
    text: string;
}
