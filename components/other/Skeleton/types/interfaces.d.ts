import { AnimationName, Variant, Display } from './types';
export interface SkeletonProps {
    animation?: AnimationName | false;
    backgroundColor?: string;
    className?: string;
    display?: Display;
    height?: number;
    isLoading: boolean;
    variant?: Variant;
    width?: number;
}
