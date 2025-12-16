import { ReactNode } from 'react';
export interface SliderProps {
    activeIndex?: null;
    currentPhoto: number;
    height?: number;
    images: ReactNode[];
    onImageMoveEnd?: () => void;
    onImageTouchStart?: () => void;
    onSlideComplete?: (idx: number) => void;
    onSlideStart?: (idx: number) => void;
    scaleOnDrag?: boolean;
    setCurrentPhoto: (idx: number) => void;
    threshHold?: number;
    transition?: number;
    width?: number;
}
export interface SlideProps {
    child: ReactNode;
    height: number;
    scaleOnDrag?: boolean;
    width: number;
}
