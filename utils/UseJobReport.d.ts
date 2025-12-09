import { HoursTimespan } from '../utils/Enums';
export declare function useJobReport(baseUrl: string, queryParams?: string): {
    data: unknown;
    hasData: boolean;
    refresh: () => void;
    isFetching: boolean;
    fetchCount: number;
    timespan: {
        startDate: Date;
        endDate: Date;
    };
    SetTimespan: (newSpan: {
        startDate: Date;
        endDate: Date;
    }) => void;
    hoursTimeSpan: HoursTimespan;
    SetHoursTimespan: (newSpan: HoursTimespan) => void;
    error: any;
};
