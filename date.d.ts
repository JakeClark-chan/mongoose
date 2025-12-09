export type Format = {
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    day?: 'numeric' | '2-digit';
    weekday?: 'narrow' | 'short' | 'long';
};
export type Unit = 'day' | 'month' | 'year' | 'week';
export declare class DateTime {
    static format(dateString: string, format?: Format, locale?: string): string;
    static relative(dateString: string, locale?: string): string;
    static minus(dateString: string, value: number, unit?: Unit): string;
    static plus(dateString: string, value: number, unit?: Unit): string;
}
