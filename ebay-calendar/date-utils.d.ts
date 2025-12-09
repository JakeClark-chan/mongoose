export type DayISO = `${number}-${number}-${number}`;
export declare function findFirstDayOfWeek(localeName: string): number;
type WeekdayInfo = {
    firstDayOfWeek: number;
    weekdayLabels: string[];
};
export declare function getWeekdayInfo(localeName: string): WeekdayInfo;
export declare function dateArgToISO(arg?: DateConstructor['arguments']): DayISO;
export declare function toISO(date: Date): DayISO;
export declare function fromISO(iso: DayISO): Date;
export declare function offsetISO(iso: DayISO, days: number): DayISO;
export declare function localeOverride(locale?: string): string;
export {};
//# sourceMappingURL=date-utils.d.ts.map