import { IconSize } from '../../../icons/Icon/interfaces';
export interface RatingProps {
    className?: string;
    fractions?: number;
    id?: string;
    isLoading?: boolean;
    isReadonly?: boolean;
    name?: string;
    onChange?: (value: number) => void;
    size?: IconSize;
    value: number;
}
