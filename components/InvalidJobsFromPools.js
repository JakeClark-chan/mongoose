import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: InvalidJobsFromPools.tsx $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import * as React from 'react';
import MaterialTable from "@material-table/core";
import { useFetchApi } from '../utils/UseFetchApi';
import { useSnackbar } from 'notistack';
import { useJobReport } from '../utils/UseJobReport';
import { Grid, Button, Table, TableCell } from '@mui/material';
import FilterList from '@mui/icons-material/FilterList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { createDateColumn } from '../utils/DateUtils';
import Selector from './Selector';
import { makeStyles, createStyles } from '@mui/styles';
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
export function InvalidJobsFromPools(props) {
    const jobReport = useJobReport(props.getJobReportUrl);
    const activeJobApi = useFetchApi(props.getActiveJobUrl);
    const fetchApi = useFetchApi();
    const [isJobDeleted, setJobDeleted] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [timeSpan, setTimeSpan] = React.useState(props.defaultTimeFilterOption);
    const [location, setLocation] = React.useState(props.defaultlocationFilterOptions);
    React.useEffect(() => {
        activeJobApi.run();
    }, []);
    React.useEffect(() => {
        if (isJobDeleted) {
            jobReport.refresh();
            activeJobApi.run();
            setJobDeleted(false);
        }
    }, [isJobDeleted]);
    function getDayDifference(jobStartTime) {
        var date1 = new Date(jobStartTime.valueOf());
        var date2 = new Date(Date.now());
        const timeDifference = date2.getTime() - date1.getTime();
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        return dayDifference * 24;
    }
    function getData() {
        var jobs = [];
        const activeJobs = activeJobApi.data;
        const completedJobs = jobReport.data;
        if (activeJobs && !jobReport.isFetching && !activeJobApi.isFetching) {
            if (activeJobs && activeJobs.length > 0) {
                activeJobs.forEach((job) => {
                    job.forEach((j) => {
                        const jobFromCompletedJobs = completedJobs === null || completedJobs === void 0 ? void 0 : completedJobs.find((cjob) => cjob.id == j.id);
                        if (jobFromCompletedJobs && jobFromCompletedJobs.state.toLowerCase() != 'active') {
                            j.state = jobFromCompletedJobs.state;
                            j.name = jobFromCompletedJobs.name;
                            j.dbState = jobFromCompletedJobs.state;
                            jobs.push(j);
                        }
                        else {
                            if (!jobFromCompletedJobs) {
                                j.dbState = "undefined";
                                jobs.push(j);
                            }
                        }
                    });
                });
                jobs = [
                    ...new Map(jobs.map((item) => [item["id"], item])).values(),
                ];
                if (jobs.length > 0 && props.showFilters) {
                    const filteredJobs = [];
                    const timeFilteredJob = [];
                    jobs.forEach((job) => {
                        if (props.showTimeFilter) {
                            var hoursDifference = getDayDifference(job.executionInfo.startTime);
                            if (hoursDifference <= timeSpan.value) {
                                if (props.showLocationFilter) {
                                    if (location.value.toString().toLowerCase() == job.location.toString().toLowerCase()) {
                                        if (filteredJobs.findIndex((j) => j.id == job.id) == -1)
                                            filteredJobs.push(job);
                                    }
                                }
                                else {
                                    if (filteredJobs.findIndex((j) => j.id == job.id) == -1)
                                        filteredJobs.push(job);
                                }
                            }
                        }
                        if (props.showLocationFilter && !props.showTimeFilter) {
                            if (location.value.toString().toLowerCase() == job.location.toString().toLowerCase()) {
                                if (timeFilteredJob.findIndex((j) => j.id == job.id) == -1)
                                    filteredJobs.push(job);
                            }
                        }
                    });
                    return filteredJobs;
                }
            }
        }
        return jobs;
    }
    function handleDelete(rowData) {
        const data = jobReport.data;
        let job;
        if (data) {
            job = data.find((j) => j.id == rowData.id);
        }
        const url = job ? props.getCancelJobUrl(job) : props.getCancelJobUrl(rowData);
        fetchApi.run(url, {
            method: 'POST'
        }).then((resp) => {
            enqueueSnackbar(`Job ${rowData.id} deleted from pool.`, { variant: "success" });
            setJobDeleted(true);
        });
    }
    function onTimespanChanged(newTimespan) {
        setTimeSpan(newTimespan);
    }
    function onLocationChanged(location) {
        setLocation(location);
    }
    function filters() {
        return (_jsxs(Grid, { container: true, spacing: 1, style: { width: 250 }, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Selector, { default: props.defaultTimeFilterOption, label: "Active since", onValueChanged: onTimespanChanged, options: props.timeFilterOptions, style: useStyles }) }), _jsx(Grid, { item: true, xs: 5, children: _jsx(Selector, { default: props.defaultlocationFilterOptions, label: "Location", onValueChanged: onLocationChanged, options: props.locationFilterOptions, style: useStyles }) })] }));
    }
    function filterBar() {
        if (expanded) {
            return (_jsxs(Grid, { container: true, spacing: 1, style: { width: 150 }, children: [_jsx(Grid, { item: true, xs: 1, children: _jsx(Button, { color: "primary", onClick: (event) => setExpanded(false), children: _jsx(ChevronLeftIcon, { fontSize: "large" }) }) }), filters()] }));
        }
        else {
            return (_jsx(Grid, { container: true, spacing: 0, style: { width: 20 }, children: _jsx(Grid, { item: true, xs: 12, children: _jsx(Button, { color: "primary", onClick: (event) => setExpanded(true), children: _jsx(FilterList, { fontSize: "large" }) }) }) }));
        }
    }
    return (_jsx("div", { children: _jsxs(Table, { size: "small", children: [_jsx(TableCell, { children: props.showFilters ? filterBar() : _jsx(_Fragment, {}) }), _jsx(TableCell, { children: _jsx(MaterialTable, { title: props.title, isLoading: jobReport.isFetching || activeJobApi.isFetching, columns: [
                            { title: "Location", field: "location" },
                            { title: "Pool name", field: "executionInfo.poolId" },
                            { title: "Id", field: "id" },
                            { title: "Name", field: "name" },
                            { title: "State", field: "dbState" },
                            createDateColumn("Creation time", "creationTime"),
                            createDateColumn("Start time", "executionInfo.startTime")
                        ], data: getData(), actions: [
                            rowData => ({
                                tooltip: 'Cancel job',
                                icon: 'cancel',
                                onClick: (event, rowData) => { handleDelete(rowData); }
                            })
                        ], options: {
                            actionsColumnIndex: -1,
                            headerStyle: { backgroundColor: '#9BA5AE', color: '#000000' },
                            search: true,
                            paging: true,
                            rowStyle: () => {
                                return {
                                    padding: '50px'
                                };
                            }
                        } }) })] }) }));
}
