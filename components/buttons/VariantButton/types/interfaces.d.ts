import { MouseEvent } from 'react';
import { ModernImagePaths } from '../../../other/LazyImage';
export interface VariantButtonProps {
    className?: string;
    imgAlt?: string;
    imgLqip?: string;
    imgSrc: ModernImagePaths;
    isAccented?: boolean;
    isOutOfStock?: boolean;
    loading?: 'eager' | 'lazy';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    outOfStockTitle?: string;
    price?: number;
    title: string;
}
