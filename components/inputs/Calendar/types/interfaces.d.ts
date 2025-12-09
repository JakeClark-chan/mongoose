import { SyntheticEvent } from 'react';
import { Locale } from 'date-fns';
import { PopperPlacement } from './types';
export interface CalendarProps {
    className?: string;
    customInputRef?: any;
    datePlaceholder?: string;
    excludeDates?: Date[];
    id: string;
    includeDates?: Date[];
    isMobilePage: boolean;
    label?: string;
    locale?: Locale;
    maxDate?: Date;
    minDate?: Date;
    onCalendarClose?: () => any;
    onCalendarOpen?: () => any;
    onChange: (date?: Date) => any;
    onClickOutside?: (e: SyntheticEvent<HTMLInputElement>) => any;
    placeholder: string;
    popperPlacement?: PopperPlacement;
    tabIndex?: string;
    value?: Date;
}
export interface CalendarRangeProps extends CalendarProps {
    cancelButtonText?: string;
    initialEndDate?: Date;
    initialStartDate?: Date;
    selectButtonText?: string;
}
export interface CalendarHeaderProps {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    locale?: Locale;
    nextMonthButtonDisabled: boolean;
    prevMonthButtonDisabled: boolean;
}
export interface CalendarHeaderRangeProps extends CalendarHeaderProps {
    endDate: string;
    headerFromFieldText: string;
    headerToFieldText: string;
    startDate: string;
}
