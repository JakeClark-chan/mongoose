import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//:>--------------------------------------------------------------------------------------+
//:>
//:>  $Source: DLQMessageCleanUp.tsx $
//:>
//:>  $Copyright: (c) 2017 Bentley Systems, Incorporated. All rights reserved. $
//:>
//:>+--------------------------------------------------------------------------------------
import * as React from 'react';
import MaterialTable from "@material-table/core";
import { useFetchApi } from '../utils/UseFetchApi';
import { useSnackbar } from 'notistack';
import { ProgressRadial } from '@itwin/itwinui-react';
export function DLQMessageCleanUp(props) {
    const fetchApi = useFetchApi();
    const [isLoading, setLoading] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState([]);
    const [isClearDLQMsgButtonClicked, setIsClearDLQMsgButtonClicked] = React.useState(false);
    React.useEffect(() => {
        getDlqMessageCount();
        setLoading(false);
    }, []);
    function getDlqMessageCount() {
        const count = [];
        props.queues.forEach((queue) => {
            fetchApi.run(props.controllerBaseUrl + queue + "/messageCount", {
                method: 'GET'
            }).then((resp) => {
                const result = {
                    name: queue,
                    dlqMessgeCount: resp
                };
                count.push(result);
                if (count.length == props.queues.length) {
                    setData(count);
                }
            });
        });
    }
    function deleteFromDLQ(rowData) {
        enqueueSnackbar("Started deletion of messages from dead letter queue, you'll be informed once messages are deleted.", { variant: "info" });
        setIsClearDLQMsgButtonClicked(true);
        setLoading(true);
        const url = props.getDeleteDlqMsgUrl(rowData[0]);
        fetchApi.run(url, {
            method: 'DELETE'
        }).then((resp) => {
            if (resp != undefined && resp.message.toString().includes("403")) {
                enqueueSnackbar("User does not have permission to delete DLQ messages", { variant: "error" });
                setIsClearDLQMsgButtonClicked(false);
                setLoading(false);
            }
            else {
                getDlqMessageCount();
                enqueueSnackbar("Messages from dead letter queue deleted successfully.", { variant: "success" });
                setIsClearDLQMsgButtonClicked(false);
                setLoading(false);
            }
        });
    }
    return (_jsx("div", { children: data.length == props.queues.length && !isLoading ?
            _jsx(MaterialTable, { title: props.title, isLoading: isLoading, columns: [
                    { title: "Name", field: "name" },
                    { title: "DLQ message count ", field: "dlqMessgeCount" }
                ], data: data, actions: [
                    rowData => ({
                        tooltip: 'Delete DLQ messages',
                        icon: 'delete',
                        onClick: (event, rowData) => deleteFromDLQ([rowData]),
                        disabled: rowData.dlqMessgeCount == 0
                    })
                ], options: {
                    actionsColumnIndex: -1,
                    headerStyle: { backgroundColor: '#9BA5AE', color: '#000000' },
                    search: false,
                    paging: false,
                    rowStyle: () => {
                        return {
                            padding: '50px'
                        };
                    }
                } }) : isClearDLQMsgButtonClicked ? _jsxs("div", { style: {
                left: "50%", position: "absolute", textAlign: "center", top: "50%"
            }, children: [_jsx(ProgressRadial, { indeterminate: true, title: "Loading" }), _jsx("p", { children: "Deleting DLQ Messages..." })] })
            : _jsxs("div", { style: {
                    left: "50%", position: "absolute", textAlign: "center", top: "50%"
                }, children: [_jsx(ProgressRadial, { indeterminate: true, title: "Loading" }), _jsx("p", { children: "Loading..." })] }) }));
}
