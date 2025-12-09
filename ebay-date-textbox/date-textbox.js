"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var makeup_expander_1 = __importDefault(require("makeup-expander"));
var calendar_1 = __importDefault(require("../ebay-calendar/calendar"));
var ebay_textbox_1 = require("../ebay-textbox");
var date_utils_1 = require("../ebay-calendar/date-utils");
var textbox_1 = require("../ebay-textbox/textbox");
var classnames_1 = __importDefault(require("classnames"));
var MIN_WIDTH_FOR_DOUBLE_PANE = 600;
var EbayDateTextbox = function (_a) {
    var className = _a.className, _b = _a.inputPlaceholderText, inputPlaceholderText = _b === void 0 ? 'YYYY-MM-DD' : _b, _c = _a.a11yOpenPopoverText, a11yOpenPopoverText = _c === void 0 ? 'open calendar' : _c, range = _a.range, controlledValue = _a.value, controlledRangeEnd = _a.rangeEnd, defaultValue = _a.defaultValue, defaultRangeEnd = _a.defaultRangeEnd, collapseOnSelect = _a.collapseOnSelect, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.onInputChange, onInputChange = _e === void 0 ? function () { } : _e, _f = _a.onInputRangeEndChange, onInputRangeEndChange = _f === void 0 ? function () { } : _f, rest = __rest(_a, ["className", "inputPlaceholderText", "a11yOpenPopoverText", "range", "value", "rangeEnd", "defaultValue", "defaultRangeEnd", "collapseOnSelect", "onChange", "onInputChange", "onInputRangeEndChange"]);
    var expander = (0, react_1.useRef)();
    var containerRef = (0, react_1.useRef)(null);
    var _g = (0, react_1.useState)(defaultValue || ''), internalValue = _g[0], setInternalValue = _g[1];
    var _h = (0, react_1.useState)(defaultRangeEnd || ''), internalRangeEnd = _h[0], setInternalRangeEnd = _h[1];
    var valueToRender = (0, textbox_1.isControlled)(controlledValue) ? controlledValue : internalValue;
    var rangeEndToRender = (0, textbox_1.isControlled)(controlledRangeEnd) ? controlledRangeEnd : internalRangeEnd;
    var _j = (0, react_1.useState)(function () {
        return (0, date_utils_1.dateArgToISO)(valueToRender);
    }), firstSelected = _j[0], setFirstSelected = _j[1];
    var _k = (0, react_1.useState)(function () {
        return (0, date_utils_1.dateArgToISO)(rangeEndToRender);
    }), secondSelected = _k[0], setSecondSelected = _k[1];
    var _l = (0, react_1.useState)(false), isPopoverOpen = _l[0], setIsPopoverOpen = _l[1];
    var _m = (0, react_1.useState)(1), numMonths = _m[0], setNumMonths = _m[1];
    var openPopover = function () {
        setIsPopoverOpen(true);
    };
    var closePopover = function () {
        setIsPopoverOpen(false);
    };
    (0, react_1.useEffect)(function () {
        if (!containerRef.current) {
            return;
        }
        expander.current = new makeup_expander_1.default(containerRef.current, {
            hostSelector: '.ebay-date-textbox--main > .icon-btn',
            contentSelector: '.date-textbox__popover',
            expandOnClick: true,
            autoCollapse: true
        });
        containerRef.current.addEventListener('expander-expand', openPopover);
        containerRef.current.addEventListener('expander-collapse', closePopover);
        var calculateNumMonths = function () {
            setNumMonths(document.documentElement.clientWidth < MIN_WIDTH_FOR_DOUBLE_PANE ? 1 : 2);
        };
        calculateNumMonths();
        window.addEventListener('resize', calculateNumMonths);
        return function () {
            var _a;
            (_a = expander.current) === null || _a === void 0 ? void 0 : _a.destroy();
            window.removeEventListener('resize', calculateNumMonths);
        };
    }, []);
    var handleInputChange = function (event, index) {
        var date = new Date(event.target.value);
        var iso = isNaN(date.getTime()) ? null : (0, date_utils_1.toISO)(date);
        if (index === 0) {
            setFirstSelected(iso);
            setInternalValue(iso || '');
        }
        else {
            setSecondSelected(iso);
            setInternalRangeEnd(iso || '');
        }
        if (range) {
            onChange(event, {
                rangeStart: index === 0 ? iso : firstSelected,
                rangeEnd: index === 1 ? iso : secondSelected
            });
        }
        else {
            onChange(event, {
                selected: iso
            });
        }
    };
    var handlePopoverSelect = function (event, _a) {
        var iso = _a.iso;
        setFirstSelected(iso);
        setInternalValue(iso);
        if (range) {
            var selected = firstSelected || secondSelected;
            var eventData = {
                rangeStart: iso,
                rangeEnd: selected
            };
            if (firstSelected && secondSelected) {
                // both were selected reset selection
                setInternalRangeEnd('');
                setSecondSelected(null);
                eventData.rangeEnd = null;
            }
            else if (selected) {
                // exactly one was selected; fiture out the order
                if (selected < iso) {
                    setFirstSelected(selected);
                    setInternalValue(selected);
                    setInternalRangeEnd(iso);
                    setSecondSelected(iso);
                    eventData.rangeStart = selected;
                    eventData.rangeEnd = iso;
                }
                else {
                    setFirstSelected(iso);
                    setInternalValue(iso);
                    setInternalRangeEnd(selected);
                    setSecondSelected(selected);
                    eventData.rangeStart = iso;
                    eventData.rangeEnd = selected;
                }
            }
            onChange(event, eventData);
        }
        else {
            onChange(event, {
                selected: iso
            });
        }
        if (collapseOnSelect) {
            expander.current.expanded = false;
        }
    };
    var handleInternalChange = function (event, index) {
        if (index === 0) {
            setInternalValue(event.target.value);
            onInputChange(event);
        }
        else {
            setInternalRangeEnd(event.target.value);
            onInputRangeEndChange(event);
        }
    };
    var _o = Array.isArray(inputPlaceholderText)
        ? inputPlaceholderText
        : [inputPlaceholderText, inputPlaceholderText], rangeStartPlaceholder = _o[0], mainPlaceholder = _o[1];
    return (react_1.default.createElement("span", { className: (0, classnames_1.default)('date-textbox', className), ref: containerRef },
        range && (react_1.default.createElement(ebay_textbox_1.EbayTextbox, { value: valueToRender, placeholder: rangeStartPlaceholder, onInputChange: function (event) { return handleInternalChange(event, 0); }, onBlur: function (event) { return handleInputChange(event, 0); } })),
        react_1.default.createElement(ebay_textbox_1.EbayTextbox, { className: "ebay-date-textbox--main", placeholder: mainPlaceholder, value: range ? rangeEndToRender : valueToRender, onInputChange: function (event) { return handleInternalChange(event, range ? 1 : 0); }, onBlur: function (event) { return handleInputChange(event, range ? 1 : 0); } },
            react_1.default.createElement(ebay_textbox_1.EbayTextboxPostfixIcon, { name: "calendar24", buttonAriaLabel: a11yOpenPopoverText })),
        react_1.default.createElement("div", { hidden: !isPopoverOpen, className: "date-textbox__popover" },
            react_1.default.createElement(calendar_1.default, __assign({}, rest, { range: range, interactive: true, navigable: true, numMonths: numMonths, selected: firstSelected && secondSelected
                    ? [firstSelected, secondSelected]
                    : firstSelected || secondSelected || undefined, onSelect: handlePopoverSelect })))));
};
exports.default = EbayDateTextbox;
