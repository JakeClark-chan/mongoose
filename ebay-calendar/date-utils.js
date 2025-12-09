"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localeOverride = exports.offsetISO = exports.fromISO = exports.toISO = exports.dateArgToISO = exports.getWeekdayInfo = exports.findFirstDayOfWeek = void 0;
function findFirstDayOfWeek(localeName) {
    // weekInfo only exists on some browsers, so we default to Sunday otherwise
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/weekInfo
    var locale = new Intl.Locale(localeName);
    if (locale.weekInfo) {
        return locale.weekInfo.firstDay;
    }
    return 0;
}
exports.findFirstDayOfWeek = findFirstDayOfWeek;
function getWeekdayInfo(localeName) {
    var firstDayOfWeek = findFirstDayOfWeek(localeName);
    var weekdayLabelFormatter = new Intl.DateTimeFormat(localeName, {
        weekday: 'short'
    });
    var weekday = new Date(2022, 9, 2 + firstDayOfWeek); // October 2, 2022 was a Sunday
    var weekdayLabels = __spreadArray([], Array(7), true).map(function () {
        var dayLabel = weekdayLabelFormatter.format(weekday);
        weekday.setDate(weekday.getDate() + 1);
        return dayLabel;
    });
    return {
        firstDayOfWeek: firstDayOfWeek,
        weekdayLabels: weekdayLabels
    };
}
exports.getWeekdayInfo = getWeekdayInfo;
function dateArgToISO(arg) {
    if (!arg)
        return undefined;
    if (/^\d\d\d\d-\d\d-\d\d$/g.test(arg))
        return arg;
    return toISO(new Date(arg));
}
exports.dateArgToISO = dateArgToISO;
function toISO(date) {
    if (isNaN(date.getTime()))
        return;
    return date.toISOString().slice(0, 10);
}
exports.toISO = toISO;
function fromISO(iso) {
    return new Date(iso);
}
exports.fromISO = fromISO;
function offsetISO(iso, days) {
    var date = fromISO(iso);
    date.setUTCDate(date.getUTCDate() + days);
    return toISO(date);
}
exports.offsetISO = offsetISO;
function localeOverride(locale) {
    return locale || navigator.language;
}
exports.localeOverride = localeOverride;
