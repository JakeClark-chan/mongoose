//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: UseJobReport.tsx $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import * as React from 'react';
import { HoursTimespan } from '../utils/Enums';
import { dateToISOWithReducedPrecision } from './DateUtils';
import moment from 'moment';
import { useFetchApi } from './UseFetchApi';
export function useJobReport(baseUrl, queryParams) {
    const sevenDaysMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const [hoursTimeSpan, setHoursTimeSpan] = React.useState(HoursTimespan.LastWeek);
    const [timespan, SetTimespan] = React.useState({
        startDate: new Date(Date.now() - sevenDaysMilliseconds),
        endDate: new Date()
    });
    const fetchApi = useFetchApi(getUrl(timespan.startDate, timespan.endDate));
    function getJobTimeQueryFilter(startDate, endDate) {
        return `startTime=${dateToISOWithReducedPrecision(startDate)}` +
            `&endTime=${dateToISOWithReducedPrecision(endDate)}`;
    }
    function getQueryFilter(startDate, endDate) {
        return queryParams ? getJobTimeQueryFilter(startDate, endDate) + `&${queryParams}` :
            getJobTimeQueryFilter(startDate, endDate);
    }
    function getUrl(startDate, endDate) {
        return baseUrl + getQueryFilter(startDate, endDate);
    }
    function getTimespanUrl(timeSpan) {
        var startDate = new Date(moment().subtract(timeSpan, 'hours').toDate());
        var endDate = new Date(moment().toDate());
        SetTimespan({
            startDate: startDate,
            endDate: endDate
        });
        return baseUrl + getQueryFilter(startDate, endDate);
    }
    function refresh() {
        fetchApi.run();
    }
    function handleTimespanChange(newSpan) {
        SetTimespan(newSpan);
        fetchApi.run(getUrl(newSpan.startDate, newSpan.endDate));
    }
    function handleHoursTimespanChange(newSpan) {
        setHoursTimeSpan(newSpan);
        fetchApi.run(getTimespanUrl(newSpan));
    }
    // run once at startup
    React.useEffect(() => {
        fetchApi.run();
    }, []);
    return {
        data: fetchApi.data,
        hasData: fetchApi.hasData,
        refresh,
        isFetching: fetchApi.isFetching,
        fetchCount: fetchApi.fetchCount,
        timespan,
        SetTimespan: handleTimespanChange,
        hoursTimeSpan,
        SetHoursTimespan: handleHoursTimespanChange,
        error: fetchApi.error
    };
}
