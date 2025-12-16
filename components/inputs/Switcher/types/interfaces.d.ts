import { ChangeEvent } from 'react';
export declare type SwitcherType = 'Primary' | 'Secondary';
export interface SwitcherProps {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    fullChangeControl?: boolean;
    id: string;
    isPlain?: boolean;
    name: string;
    onChange: (value: boolean | ChangeEvent<HTMLInputElement>) => void;
    type?: SwitcherType;
}
