import { jsxs as _jsxs } from "react/jsx-runtime";
export function dateToISOWithReducedPrecision(date) {
    return date.toISOString().slice(0, 19) + 'Z';
}
export function createDateColumn(label, dateAccess, defaultSort) {
    return ({
        title: label,
        field: dateAccess,
        type: "date",
        sorting: true,
        defaultSort: defaultSort,
        render: rowData => renderDate(rowData, dateAccess)
    });
}
function renderDate(data, dateAccess) {
    var dateUTC = dateAccess.split('.').reduce(function (p, prop) { return p ? p[prop] : p; }, data);
    return (_jsxs("div", { children: [" ", dateStringToLocaleString(dateUTC)] }));
}
export function dateStringToLocaleString(dateString) {
    var date = new Date(dateString);
    if (isNaN(date.getTime()))
        return "";
    return date.toLocaleString();
}
