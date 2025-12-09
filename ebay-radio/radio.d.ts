import { ComponentProps, FC } from 'react';
import { EbayChangeEventHandler, EbayFocusEventHandler, EbayKeyboardEventHandler } from '../common/event-utils/types';
type Size = 'default' | 'large';
type EbayRadioProps = {
    size?: Size;
    onChange?: EbayChangeEventHandler<HTMLInputElement, {
        value: string | number;
    }>;
    onFocus?: EbayFocusEventHandler<HTMLInputElement, {
        value: string | number;
    }>;
    onKeyDown?: EbayKeyboardEventHandler<HTMLInputElement, {
        value: string | number;
    }>;
};
type InputProps = Omit<ComponentProps<'input'>, 'size' | 'onChange' | 'onFocus' | 'onKeyDown'>;
declare const EbayRadio: FC<InputProps & EbayRadioProps>;
export default EbayRadio;
//# sourceMappingURL=radio.d.ts.map