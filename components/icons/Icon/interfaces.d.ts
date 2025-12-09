export declare type IconSize = 'XL' | 'L' | 'M' | 'S';
export interface IconProps {
    borderColor?: string;
    className?: string;
    color?: string;
    colorOpacity?: number;
    fill?: string;
    groundColor?: string;
    height?: number;
    onClick?: () => void;
    originalHeight?: number;
    originalWidth?: number;
    size?: IconSize;
    stroke?: string;
    strokeWidth?: string;
    type?: 'bold' | 'light' | 'fill' | 'color';
    viewBox?: string;
    width?: number;
}
export interface GetSizeParams {
    height: number | undefined;
    ratio: number;
    size?: IconSize;
    width: number | undefined;
}
