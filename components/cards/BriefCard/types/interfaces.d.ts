import { ModernImagePaths } from '../../../other/LazyImage';
export interface BriefCardProps {
    className?: string;
    imgAlt?: string;
    imgLqip?: string;
    imgSrc: ModernImagePaths;
    isOutOfStock?: boolean;
    loading?: 'eager' | 'lazy';
    outOfStockTitle?: string;
    price: number;
    title?: string;
}
