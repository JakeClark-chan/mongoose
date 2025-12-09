"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ebay_icon_button_1 = require("../ebay-icon-button");
var date_utils_1 = require("./date-utils");
var classnames_1 = __importDefault(require("classnames"));
var DAY_UPDATE_KEYMAP = {
    ArrowRight: 1,
    ArrowLeft: -1,
    ArrowDown: 7,
    ArrowUp: -7
};
var EbayCalendar = function (_a) {
    var selected = _a.selected, _b = _a.numMonths, numMonths = _b === void 0 ? 1 : _b, navigable = _a.navigable, interactive = _a.interactive, range = _a.range, locale = _a.locale, disableBefore = _a.disableBefore, disableAfter = _a.disableAfter, disableWeekdays = _a.disableWeekdays, disableList = _a.disableList, _c = _a.a11ySelectedText, a11ySelectedText = _c === void 0 ? 'selected' : _c, _d = _a.a11yRangeStartText, a11yRangeStartText = _d === void 0 ? 'start of range' : _d, _e = _a.a11yInRangeText, a11yInRangeText = _e === void 0 ? 'in range' : _e, _f = _a.a11yRangeEndText, a11yRangeEndText = _f === void 0 ? 'end of range' : _f, _g = _a.a11ySeparator, a11ySeparator = _g === void 0 ? '-' : _g, _h = _a.a11yTodayText, a11yTodayText = _h === void 0 ? 'today' : _h, _j = _a.a11yDisabledText, a11yDisabledText = _j === void 0 ? 'inactive' : _j, _k = _a.getA11yShowMonthText, getA11yShowMonthText = _k === void 0 ? function (monthTitle) { return "Show ".concat(monthTitle); } : _k, linkBuilder = _a.linkBuilder, _l = _a.onMonthChange, onMonthChange = _l === void 0 ? function () { } : _l, _m = _a.onFocus, onFocus = _m === void 0 ? function () { } : _m, _o = _a.onSelect, onSelect = _o === void 0 ? function () { } : _o;
    var todayISO = (0, date_utils_1.toISO)(new Date());
    var _p = (0, date_utils_1.getWeekdayInfo)((0, date_utils_1.localeOverride)(locale)), firstDayOfWeek = _p.firstDayOfWeek, weekdayLabels = _p.weekdayLabels;
    var containerRef = (0, react_1.useRef)(null);
    var _q = (0, react_1.useState)(0), offset = _q[0], setOffset = _q[1];
    var _r = (0, react_1.useState)(null), focusISO = _r[0], setFocusISO = _r[1];
    var _s = (0, react_1.useState)(todayISO), tabIndexISO = _s[0], setTabIndexISO = _s[1];
    var baseISO = (0, react_1.useRef)(todayISO);
    var getMonthDate = function (monthOffset) {
        var baseDate = (0, date_utils_1.fromISO)(baseISO.current);
        var date = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth() + monthOffset));
        return date;
    };
    var getFirstVisibleISO = function () {
        return (0, date_utils_1.toISO)(getMonthDate(offset));
    };
    var getLastVisibleISO = function () {
        var baseDate = (0, date_utils_1.fromISO)(baseISO.current);
        return (0, date_utils_1.toISO)(new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth() + offset + (numMonths || 1), 0)));
    };
    (0, react_1.useEffect)(function () {
        if (selected) {
            var selectedISOs = Array.isArray(selected) ? selected : [selected];
            var currFirstISO_1 = getFirstVisibleISO();
            var currLastISO_1 = getLastVisibleISO();
            var selectedTimeInView = selectedISOs.find(function (iso) { return iso >= currFirstISO_1 && iso <= currLastISO_1; });
            if (selectedTimeInView === undefined) {
                baseISO.current = selectedISOs[0];
                setOffset(0);
            }
        }
    }, [selected]);
    var calculateRangeDisplay = function () {
        if (selected && range) {
            var iso1 = void 0;
            var iso2 = void 0;
            if (Array.isArray(selected)) {
                // Two elements are selected, we can use them as the ends of the range.
                iso1 = selected[0], iso2 = selected[1];
            }
            else if (focusISO) {
                // One element is selected and the user is focused on a date,
                // so we use the selected component and the focus date instead
                iso1 = selected;
                iso2 = focusISO;
            }
            if (iso1 && iso2) {
                var _a = [iso1, iso2].sort(), start = _a[0], end = _a[1];
                return {
                    rangeStart: start,
                    rangeEnd: end
                };
            }
        }
        return {
            rangeStart: null,
            rangeEnd: null
        };
    };
    var monthTitle = function (date) {
        var formatter = new Intl.DateTimeFormat((0, date_utils_1.localeOverride)(locale), {
            month: 'long',
            year: 'numeric'
        });
        return formatter.format(new Date(date.getUTCFullYear(), date.getUTCMonth()));
    };
    var isDayDisabled = function (iso) {
        return (disableBefore && iso < disableBefore) ||
            (disableAfter && iso > disableAfter) ||
            (disableWeekdays && disableWeekdays.includes((0, date_utils_1.fromISO)(iso).getUTCDay())) ||
            (disableList && disableList.includes(iso));
    };
    var getFirstActiveISO = function () {
        var iso = getFirstVisibleISO();
        var lastVisible = getLastVisibleISO();
        while (iso <= lastVisible && isDayDisabled(iso)) {
            iso = (0, date_utils_1.offsetISO)(iso, 1);
        }
        return iso > lastVisible ? null : iso;
    };
    var getLastActiveISO = function () {
        var iso = getLastVisibleISO();
        var firstVisible = getFirstVisibleISO();
        while (iso >= firstVisible && isDayDisabled(iso)) {
            iso = (0, date_utils_1.offsetISO)(iso, -1);
        }
        return iso < firstVisible ? null : iso;
    };
    var setTabindexAndFocus = function (iso) {
        setTabIndexISO(iso);
        setTimeout(function () {
            var _a;
            var elementToFocus = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("[data-iso=\"".concat(iso, "\"]"));
            elementToFocus === null || elementToFocus === void 0 ? void 0 : elementToFocus.focus();
        });
    };
    var prevMonth = function (focus) {
        if (disableBefore && getFirstVisibleISO() <= disableBefore) {
            return false;
        }
        setOffset(function (currentOffset) { return currentOffset - 1; });
        var newTabIndexISO = tabIndexISO;
        var lastActiveISO = getLastActiveISO();
        if (lastActiveISO && lastActiveISO < tabIndexISO) {
            newTabIndexISO = lastActiveISO;
            setTabIndexISO(lastActiveISO);
        }
        if (focus) {
            setTabindexAndFocus(newTabIndexISO);
        }
        onMonthChange({
            iso: (0, date_utils_1.toISO)(getMonthDate(offset))
        });
        return true;
    };
    var nextMonth = function (focus) {
        if (disableAfter && getLastVisibleISO() >= disableAfter) {
            return false;
        }
        setOffset(function (currentOffset) { return currentOffset + 1; });
        var newTabIndexISO = tabIndexISO;
        var firstActiveISO = getFirstActiveISO();
        if (firstActiveISO && firstActiveISO > tabIndexISO) {
            newTabIndexISO = firstActiveISO;
            setTabIndexISO(firstActiveISO);
        }
        if (focus) {
            setTabindexAndFocus(newTabIndexISO);
        }
        onMonthChange({
            iso: (0, date_utils_1.toISO)(getMonthDate(offset + (numMonths || 1)))
        });
    };
    var onKeyDown = function (event) {
        var dayChange = DAY_UPDATE_KEYMAP[event.key];
        if (dayChange) {
            event.preventDefault();
            var tries = 7;
            var iso = tabIndexISO;
            do {
                iso = (0, date_utils_1.offsetISO)(iso, dayChange);
            } while (tries-- > 0 && isDayDisabled(iso));
            if (tries > 0) {
                var firstVisible = getFirstVisibleISO();
                var lastVisible = getLastVisibleISO();
                if (iso < firstVisible) {
                    if (navigable) {
                        prevMonth();
                    }
                    else {
                        iso = firstVisible;
                    }
                }
                else if (iso > lastVisible) {
                    if (navigable) {
                        nextMonth();
                    }
                    else {
                        iso = lastVisible;
                    }
                }
                setTabindexAndFocus(iso);
            }
        }
        else {
            switch (event.key) {
                case 'PageUp':
                    prevMonth(true);
                    break;
                case 'PageDown':
                    nextMonth(true);
                    break;
                case 'Home':
                    setTabindexAndFocus(getFirstActiveISO());
                    break;
                case 'End':
                    setTabindexAndFocus(getLastActiveISO());
                    break;
                default:
            }
        }
    };
    var onDaySelect = function (event, iso) {
        onSelect(event, { iso: iso });
    };
    var onDayFocus = function (event, day) {
        setFocusISO(day);
        setTabIndexISO(day);
        onFocus(event, { iso: day });
    };
    var onDayBlur = function () {
        setFocusISO(null);
    };
    var _t = calculateRangeDisplay(), rangeStart = _t.rangeStart, rangeEnd = _t.rangeEnd;
    var isDayInRange = function (iso) {
        if (!rangeStart || !rangeEnd) {
            return false;
        }
        if (iso < rangeStart || iso > rangeEnd) {
            return false;
        }
        return true;
    };
    var monthDates = __spreadArray([], Array(numMonths), true).map(function (_, i) { return getMonthDate(offset + i); });
    return (react_1.default.createElement("div", { className: "calendar", ref: containerRef },
        navigable && (react_1.default.createElement("div", { className: "calendar__header" },
            react_1.default.createElement("div", { className: "calendar__header--inner" },
                react_1.default.createElement(ebay_icon_button_1.EbayIconButton, { transparent: true, size: "small", icon: "chevronLeft24", disabled: disableBefore && getFirstVisibleISO() <= disableBefore, "aria-label": getA11yShowMonthText(monthTitle(getMonthDate(offset - 1))), onClick: function () { return prevMonth(); } }),
                monthDates.map(function (monthDate, i) { return (react_1.default.createElement("h3", { key: i }, monthTitle(monthDate))); }),
                react_1.default.createElement(ebay_icon_button_1.EbayIconButton, { transparent: true, size: "small", icon: "chevronRight24", disabled: disableAfter && getLastVisibleISO() >= disableAfter, "aria-label": getA11yShowMonthText(monthTitle(getMonthDate(offset + numMonths))), onClick: function () { return nextMonth(); } })))),
        react_1.default.createElement("div", { className: "calendar__body" }, monthDates.map(function (monthDate, i) {
            var numBlankDays = (monthDate.getUTCDay() - firstDayOfWeek + 7) % 7;
            var year = monthDate.getUTCFullYear();
            var month = monthDate.getUTCMonth();
            var daysInMont = new Date(year, month + 1, 0).getDate();
            var calendarRows = __spreadArray([], Array(Math.ceil((numBlankDays + daysInMont) / 7)), true);
            return (react_1.default.createElement("div", { key: i, className: "calendar__month" },
                react_1.default.createElement("table", { onKeyDown: onKeyDown },
                    react_1.default.createElement("caption", null, monthTitle(monthDate)),
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null, weekdayLabels.map(function (dayName) { return (react_1.default.createElement("th", { key: dayName, scope: "col" }, dayName)); }))),
                    react_1.default.createElement("tbody", null, calendarRows.map(function (_, row) {
                        var startDate = row * 7 - numBlankDays + 1;
                        var endDate = startDate + 6;
                        var columns = [];
                        if (row === 0 && numBlankDays !== 0) {
                            startDate = 1;
                            columns.push(react_1.default.createElement("td", { key: "pre-column", colSpan: numBlankDays }));
                        }
                        else if (endDate > daysInMont) {
                            endDate = daysInMont;
                        }
                        var _loop_1 = function (day) {
                            var dayISO = (0, date_utils_1.toISO)(new Date(Date.UTC(year, month, day)));
                            var isToday = dayISO === todayISO;
                            var isSelected = Array.isArray(selected)
                                ? selected.some(function (iso) { return iso === dayISO; })
                                : selected === dayISO;
                            var isRangeStart = dayISO === rangeStart;
                            var isInRange = isDayInRange(dayISO);
                            var isRangeEnd = dayISO === rangeEnd;
                            var isDisabled = isDayDisabled(dayISO);
                            var a11yTexts = [
                                '',
                                isSelected && a11ySelectedText,
                                isRangeStart && a11yRangeStartText,
                                !isRangeStart && !isRangeEnd && isInRange && a11yInRangeText,
                                isRangeEnd && a11yRangeEndText,
                                !interactive && isToday && a11yTodayText,
                                !interactive && isDisabled && a11yDisabledText
                            ].filter(function (value) { return typeof value !== 'boolean' || value !== false; });
                            var link = !interactive && !isDisabled && linkBuilder && linkBuilder(dayISO);
                            var NonInteractiveTag = link ? 'a' : 'span';
                            columns.push(react_1.default.createElement("td", { key: day, className: (0, classnames_1.default)({
                                    'calendar__cell--selected': isSelected,
                                    'calendar__range--start': isRangeStart,
                                    'calendar__range': isInRange,
                                    'calendar__range--end': isRangeEnd
                                }) }, interactive ? (react_1.default.createElement("button", { disabled: isDisabled, "aria-label": a11yTexts.length > 1
                                    ? "".concat(day).concat(a11yTexts.join(a11ySeparator))
                                    : undefined, tabIndex: tabIndexISO !== dayISO ? -1 : undefined, "aria-current": isToday ? 'date' : undefined, "aria-pressed": isSelected ? 'true' : undefined, onClick: function (event) { return onDaySelect(event, dayISO); }, onFocus: function (event) { return onDayFocus(event, dayISO); }, onMouseOver: function (event) { return onDayFocus(event, dayISO); }, onMouseOut: function (event) { return onDayBlur(); }, onBlur: function () { return onDayBlur(); }, "data-iso": dayISO }, day)) : (react_1.default.createElement(NonInteractiveTag, { className: (0, classnames_1.default)({
                                    'calendar__cell--disabled': isDisabled,
                                    'calendar__cell--current': isToday
                                }), href: link },
                                day,
                                a11yTexts.length > 1 && (react_1.default.createElement("span", { className: "clipped" }, a11yTexts.join(a11ySeparator)))))));
                        };
                        for (var day = startDate; day <= endDate; day++) {
                            _loop_1(day);
                        }
                        return (react_1.default.createElement("tr", { key: row }, columns));
                    })))));
        }))));
};
exports.default = EbayCalendar;
