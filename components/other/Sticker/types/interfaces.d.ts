import { ReactNode } from 'react';
import { GiftType } from './types';
export interface StickerProps {
    backgroundColor: string;
    borderColor?: string;
    className?: string;
    color: string;
    icon?: ReactNode;
    itemProp?: string;
    stickerType?: GiftType;
    text: string;
}
