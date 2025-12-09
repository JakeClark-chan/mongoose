import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import MaterialTable from "@material-table/core";
import moment from 'moment';
import useInterval from '../../utils/UseInterval';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useFetchApi } from '../../utils/UseFetchApi';
import { dateToISOWithReducedPrecision } from '../../utils/DateUtils';
import { makeStyles, createStyles } from '@mui/styles';
import Selector from '../Selector';
const useStyles = makeStyles((theme) => createStyles({
    formControl: {
        marginLeft: theme.spacing(2),
        minWidth: 120,
        backgroundColor: theme.palette.background.paper,
    },
    Select: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
    },
    form: {
        ...theme.typography.h6,
    },
}));
export function JobOutcomeTypeStats(props) {
    var _a;
    const [filterCriteriaValue, setFilterCriteriaValue] = React.useState(props.defaultFilterOption.value);
    const [autoRefresh, setAutoRefresh] = React.useState(true);
    const jobOutcomeByTypeStats = useFetchApi(`${props.dataUrl}?fromDateTime=${getTimespanUrl(filterCriteriaValue)}`);
    React.useEffect(() => {
        jobOutcomeByTypeStats.run();
    }, [filterCriteriaValue]);
    function getTimespanUrl(timeSpan) {
        var startEndDate = new Date(moment().subtract(timeSpan, 'hours').toDate());
        return dateToISOWithReducedPrecision(startEndDate);
    }
    function onTimespanChanged(newTimespan) {
        setFilterCriteriaValue(newTimespan);
    }
    function toggleAutoRefresh() {
        if (autoRefresh) {
            setAutoRefresh(false);
        }
        else {
            setAutoRefresh(true);
            jobOutcomeByTypeStats.run();
        }
    }
    useInterval(() => {
        if (jobOutcomeByTypeStats.error) {
            setAutoRefresh(false);
            return;
        }
        jobOutcomeByTypeStats.run();
    }, autoRefresh ? 10000 : null);
    return (_jsx("div", { children: _jsx(MaterialTable, { title: _jsx(Selector, { default: props.defaultFilterOption, onValueChanged: onTimespanChanged, options: props.filterOptions, style: useStyles }), isLoading: jobOutcomeByTypeStats.fetchCount === 0, columns: [
                { title: "Job type", field: "jobType", cellStyle: { width: 35, maxWidth: 35 }, sorting: false },
                { title: "Success", field: "successCount", cellStyle: { width: 20, maxWidth: 20 }, align: "right", sorting: false },
                { title: "Failed", field: "failedCount", cellStyle: { width: 20, maxWidth: 20 }, align: "right", sorting: false },
                { title: "Cancelled", field: "cancelledCount", cellStyle: { width: 20, maxWidth: 20 }, align: "right", sorting: false },
                { title: "Total", field: "totalCount", cellStyle: { width: 20, maxWidth: 20 }, align: "right", sorting: false },
            ], data: (_a = jobOutcomeByTypeStats.data) !== null && _a !== void 0 ? _a : [], actions: [
                {
                    icon: () => autoRefresh ? _jsx(PauseCircleOutlineIcon, {}) : _jsx(PlayCircleOutlineIcon, {}),
                    tooltip: 'Auto Refresh',
                    isFreeAction: true,
                    onClick: () => toggleAutoRefresh()
                },
            ], options: {
                filtering: false,
                headerStyle: { backgroundColor: jobOutcomeByTypeStats.error ? '#FF0000' : '#9BA5AE', color: '#000000', maxWidth: 25, width: 25 },
                padding: 'dense',
                rowStyle: {
                    fontSize: "0.875rem",
                },
                search: false,
                paging: false,
                maxBodyHeight: 400
            } }) }));
}
