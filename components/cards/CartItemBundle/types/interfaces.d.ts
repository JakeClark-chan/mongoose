import { CartItemNextTypes, CartItemNextProps } from '../../CartItemNext/types';
export interface CartItemBundleTypes extends CartItemNextTypes {
    additionalItems?: CartItemNextTypes[];
    isCheckout?: boolean;
}
export interface CartItemBundleProps extends CartItemNextProps {
    additionalItems?: CartItemNextProps[];
    isCheckout?: boolean;
}
