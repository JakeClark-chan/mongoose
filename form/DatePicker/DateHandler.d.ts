import type { Writable, Readable } from 'svelte/store';
export type Calendar = {
    year: number;
    month: number;
    number: number;
};
export default class DateHandler {
    private context;
    constructor(dateString: string | null);
    getDate(): Writable<Date>;
    setDate(day: Calendar): void;
    getNavDate(): Writable<Date>;
    setMonth(month: number): void;
    setYear(year: number): void;
    getCalendar(): Readable<Calendar[]>;
}
