import React from 'react';
import { CardSize } from './types';
interface IconsProps {
    alt: string;
    iconSrc: string;
}
export interface AccentCardProps {
    children?: React.ReactNode;
    className?: string;
    icons?: IconsProps[];
    isAccented?: boolean;
    size?: CardSize;
    title: string;
}
export {};
