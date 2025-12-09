import { ComponentProps, FC } from 'react';
import { EbayChangeEventHandler, EbayFocusEventHandler, EbayKeyboardEventHandler } from '../common/event-utils/types';
export type EventProps = {
    value: number;
};
type Props = ComponentProps<'div'> & {
    a11yText?: string;
    value?: string;
    a11yStarText?: string[];
    disabled?: boolean;
    name?: string;
    onKeyDown?: EbayKeyboardEventHandler<HTMLInputElement, EventProps>;
    onChange?: EbayChangeEventHandler<HTMLInputElement, EventProps>;
    onFocus?: EbayFocusEventHandler<HTMLInputElement, EventProps>;
};
declare const EbayStarRatingSelect: FC<Props>;
export default EbayStarRatingSelect;
//# sourceMappingURL=star-rating-select.d.ts.map