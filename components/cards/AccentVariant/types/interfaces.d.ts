import { MouseEvent } from 'react';
import { AccentCardProps } from '../../AccentCard/types';
import { ModernImagePaths } from '../../../other/LazyImage';
export interface AccentVariantProps extends AccentCardProps {
    className?: string;
    imgAlt?: string;
    imgLqip?: string;
    imgSrc: ModernImagePaths;
    isOutOfStock?: boolean;
    loading?: 'eager' | 'lazy';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    outOfStockTitle?: string;
    price?: number;
    productColor?: string;
    shouldOnlyImage?: boolean;
}
