import { ReactElement } from 'react';
export declare type ChipSize = 'XXL' | 'XL' | 'L' | 'M' | 'S';
export declare enum ChipStateEnum {
    DEFAULT = "default",
    DISABLED = "disabled",
    SELECTED = "selected"
}
export interface ChipsProps {
    className?: string;
    id?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    isOutline?: boolean;
    isTab?: boolean;
    leftIcon?: ReactElement;
    name?: string;
    onTabSelect?: (evt: any) => void;
    rightIcon?: ReactElement;
    size?: ChipSize;
    text?: string;
}
