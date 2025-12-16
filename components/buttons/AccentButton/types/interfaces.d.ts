import { MouseEvent } from 'react';
import { AccentCardProps } from '../../../cards/AccentCard/types';
import { SkeletonProps } from '../../../other/Skeleton/types';
export interface AccentButtonProps extends AccentCardProps, Partial<SkeletonProps> {
    className?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
