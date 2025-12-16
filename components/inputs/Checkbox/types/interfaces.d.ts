import { ChangeEvent } from 'react';
import { RadioSize } from '../../MenuRadioItem';
export interface CheckboxProps {
    className?: string;
    disabled?: boolean;
    fullChangeControl?: boolean;
    id: string;
    initChecked?: boolean;
    isCheckedOuter?: boolean;
    label?: string;
    labelJsx?: JSX.Element;
    name: string;
    onChange: (value: boolean | ChangeEvent<HTMLInputElement>) => void;
    size?: RadioSize;
}
