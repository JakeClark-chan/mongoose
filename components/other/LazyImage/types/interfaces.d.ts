export interface ImagePaths {
    jpg: string;
    webp: string;
}
export interface ImageSource {
    media?: string;
    srcSet: string;
    type: string;
}
export declare type ModernImagePaths = ImagePaths | string;
export interface LazyImageProps {
    alt?: string;
    className: string;
    height?: number;
    itemProp?: string;
    loading?: 'eager' | 'lazy';
    lqip: string;
    source?: ImageSource[];
    src: ModernImagePaths;
    title?: string;
    width?: number;
}
