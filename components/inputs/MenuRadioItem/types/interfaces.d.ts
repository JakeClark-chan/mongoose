export declare type RadioSize = 'L' | 'M' | 'S';
export interface MenuRadioItemProps {
    id: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    onClick: (value?: string) => void;
    size?: RadioSize;
    subTitle?: string;
    title?: string;
    value?: string;
}
