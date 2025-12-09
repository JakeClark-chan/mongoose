import { FC, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import { DayISO } from './date-utils';
export type EbayCalendarProps = {
    selected?: DayISO | DayISO[];
    numMonths?: number;
    navigable?: boolean;
    interactive?: boolean;
    range?: boolean;
    locale?: string;
    disableBefore?: DayISO;
    disableAfter?: DayISO;
    disableWeekdays?: number[];
    disableList?: DayISO[];
    getA11yShowMonthText?: (monthTitle: string) => string;
    a11ySelectedText?: string;
    a11yRangeStartText?: string;
    a11yInRangeText?: string;
    a11yRangeEndText?: string;
    a11ySeparator?: string;
    a11yTodayText?: string;
    a11yDisabledText?: string;
    linkBuilder?: (iso: DayISO) => string;
    onMonthChange?: ({ iso }: {
        iso: DayISO;
    }) => void;
    onFocus?: (event: MouseEvent | KeyboardEvent | FocusEvent, { iso }: {
        iso: DayISO;
    }) => void;
    onSelect?: (event: MouseEvent, { iso }: {
        iso: DayISO;
    }) => void;
};
declare const EbayCalendar: FC<EbayCalendarProps>;
export default EbayCalendar;
//# sourceMappingURL=calendar.d.ts.map