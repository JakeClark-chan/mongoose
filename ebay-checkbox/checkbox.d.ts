import React, { ComponentProps, FC } from 'react';
import { EbayChangeEventHandler, EbayFocusEventHandler, EbayKeyboardEventHandler } from '../common/event-utils/types';
type Size = 'default' | 'large';
type InputProps = Omit<ComponentProps<'input'>, 'size' | 'onChange' | 'onFocus' | 'onKeyDown'>;
type EbayCheckboxProps = {
    size?: Size;
    onChange?: EbayChangeEventHandler<HTMLInputElement, {
        value: string | number;
        checked: boolean;
    }>;
    onFocus?: EbayFocusEventHandler<HTMLInputElement, {
        value: string | number;
        checked: boolean;
    }>;
    onKeyDown?: EbayKeyboardEventHandler<HTMLInputElement, {
        value: string | number;
        checked: boolean;
    }>;
    inputRef?: React.LegacyRef<HTMLInputElement>;
};
declare const EbayCheckbox: FC<InputProps & EbayCheckboxProps>;
export default EbayCheckbox;
//# sourceMappingURL=checkbox.d.ts.map