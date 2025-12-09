import { FC } from 'react';
import { EbayCalendarProps } from '../ebay-calendar/calendar';
import { EbayChangeEventHandler, EbayFocusEventHandler, EbayMouseEventHandler } from '../common/event-utils/types';
type EventData = {
    selected?: string;
    rangeStart?: string;
    rangeEnd?: string;
};
export type EbayDateTextboxProps = Omit<EbayCalendarProps, 'interactive' | 'navigable' | 'numMonths' | 'selected'> & {
    className?: string;
    value?: string;
    rangeEnd?: string;
    defaultValue?: string;
    defaultRangeEnd?: string;
    range?: boolean;
    collapseOnSelect?: boolean;
    inputPlaceholderText?: string | string[];
    a11yOpenPopoverText?: string;
    onChange?: EbayChangeEventHandler<HTMLInputElement, EventData> & EbayMouseEventHandler<HTMLInputElement, EventData> & EbayFocusEventHandler<HTMLInputElement, EventData>;
    onInputChange?: EbayChangeEventHandler<HTMLInputElement>;
    onInputRangeEndChange?: EbayChangeEventHandler<HTMLInputElement>;
};
declare const EbayDateTextbox: FC<EbayDateTextboxProps>;
export default EbayDateTextbox;
//# sourceMappingURL=date-textbox.d.ts.map