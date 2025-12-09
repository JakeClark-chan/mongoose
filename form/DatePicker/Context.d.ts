import { type Writable, type Readable } from 'svelte/store';
import type { Calendar } from './DateHandler';
export default class Context {
    date: Writable<Date>;
    navDate: Writable<Date>;
    day: Readable<number>;
    month: Readable<number>;
    year: Readable<number>;
    calendar: Readable<Calendar[]>;
    constructor(dateString: string | null);
    getMonth(): Readable<number>;
    getYear(): Readable<number>;
    setMonth(month: number): void;
    setYear(year: number): void;
    getCalendar(): Readable<Calendar[]>;
    private getMonthLength;
    private isLeapYear;
    private getMonthDays;
    private subscribe;
}
