import { FC, AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { StickerProps } from '../../../other/Sticker';
import { IconProps } from '../../../icons/Icon/interfaces';
export declare type Link = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
export interface CartItemNextTypes {
    cascadeTitle?: string;
    className?: string;
    deleteButtonText?: string;
    esdTitle?: string;
    imgIcon?: FC<IconProps>;
    imgLqip?: string;
    imgSrc?: string;
    inStock?: boolean;
    isCascade?: boolean;
    isCheckout?: boolean;
    isCountable?: boolean;
    isDeletable?: boolean;
    isDisabled?: boolean;
    isEsd?: boolean;
    isLoading?: boolean;
    isOutOfStock?: boolean;
    isShowcase?: boolean;
    link?: Link;
    oldPrice?: number;
    onBlur?: (...any: any[]) => any;
    onDecrease?: (...any: any[]) => any;
    onDelete?: (...any: any[]) => any;
    onIncrease?: (...any: any[]) => any;
    outOfStockTitle?: string;
    price: number;
    quantity: number;
    shouldRenderQuantity?: boolean;
    showcaseTitle?: string;
    stickers?: StickerProps[];
    title: string;
    totalOldPrice?: number;
    totalPrice?: number;
}
export interface CartItemNextProps extends Partial<CartItemNextTypes> {
}
export interface ISticker extends StickerProps {
}
