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
var classnames_1 = __importDefault(require("classnames"));
var use_roving_index_1 = __importDefault(require("../common/event-utils/use-roving-index"));
var event_utils_1 = require("../common/event-utils");
var component_utils_1 = require("../common/component-utils");
var index_1 = require("./index");
var EbayMenu = function (_a) {
    var _b = _a.baseEl, Container = _b === void 0 ? 'span' : _b, type = _a.type, _c = _a.priority, priority = _c === void 0 ? 'secondary' : _c, checked = _a.checked, className = _a.className, autofocus = _a.autofocus, _d = _a.onClick, onClick = _d === void 0 ? function () { } : _d, _e = _a.onKeyDown, onKeyDown = _e === void 0 ? function () { } : _e, _f = _a.onChange, onChange = _f === void 0 ? function () { } : _f, _g = _a.onSelect, onSelect = _g === void 0 ? function () { } : _g, forwardedRef = _a.forwardedRef, children = _a.children, rest = __rest(_a, ["baseEl", "type", "priority", "checked", "className", "autofocus", "onClick", "onKeyDown", "onChange", "onSelect", "forwardedRef", "children"]);
    var childrenArray = react_1.Children.toArray(children);
    var _h = (0, use_roving_index_1.default)(children, index_1.EbayMenuItem, autofocus === true ? 0 : undefined), focusedIndex = _h[0], setFocusedIndex = _h[1];
    var _j = (0, react_1.useState)(childrenArray.map(function () { return false; })), checkedIndexes = _j[0], setCheckedIndexes = _j[1];
    var valuesFromChecked = function (indexes) {
        return childrenArray.reduce(function (values, item, i) {
            return indexes[i] ? __spreadArray(__spreadArray([], values, true), [item.props.value], false) : values;
        }, []);
    };
    var indexesFromChecked = function (indexes) {
        return indexes.reduce(function (all, value, i) { return value ? __spreadArray(__spreadArray([], all, true), [i], false) : all; }, []);
    };
    var eventProps = function (index, indexes) { return ({
        index: index,
        checked: indexesFromChecked(indexes)
    }); };
    var checkboxEventProps = function (index, indexes) { return (__assign(__assign({}, eventProps(index, indexes)), { indexes: indexesFromChecked(indexes), checkedValues: valuesFromChecked(indexes) })); };
    var updateIndex = function (index, value, resetOthers) {
        if (resetOthers === void 0) { resetOthers = false; }
        var anyChanges = false;
        var newValues = checkedIndexes.map(function (indexChecked, i) {
            var defaultValue = resetOthers ? false : indexChecked;
            if (index === i) {
                if (indexChecked !== value) {
                    anyChanges = true;
                }
                return value;
            }
            return defaultValue;
        });
        if (anyChanges) {
            setCheckedIndexes(newValues);
            return newValues;
        }
    };
    var selectIndex = function (index) {
        switch (type) {
            case 'radio':
                return updateIndex(index, true, true);
            case 'checkbox':
                return updateIndex(index, !checkedIndexes[index], false);
            default:
                return checkedIndexes.map(function (_, i) { return i === index; });
        }
    };
    (0, react_1.useEffect)(function () {
        if (type === 'radio') {
            if (checked === undefined) {
                var checkedIndex = childrenArray.findIndex(function (child) { return child.props.checked; });
                if (checkedIndex > -1) {
                    selectIndex(checkedIndex);
                }
            }
            else {
                selectIndex(checked);
            }
        }
        else if (type === 'checkbox') {
            setCheckedIndexes(childrenArray.map(function (child) { return Boolean(child.props.checked); }));
        }
    }, []);
    var handleChange = function (e, index, newValues) {
        switch (type) {
            case 'radio':
            case 'checkbox':
                return onChange(e, checkboxEventProps(index, newValues));
            default:
                return onSelect(e, eventProps(index, newValues));
        }
    };
    var handleKeyDown = function (e, index) {
        var newValues;
        if ((0, event_utils_1.isActionKey)(e.key)) {
            newValues = selectIndex(index);
            if (newValues) {
                handleChange(e, index, newValues);
            }
        }
        switch (type) {
            case 'radio':
            case 'checkbox':
                return onKeyDown(e, checkboxEventProps(index, newValues || checkedIndexes));
            default:
                return onKeyDown(e, eventProps(index, newValues || checkedIndexes));
        }
    };
    var handleClick = function (e, index) {
        setFocusedIndex(index);
        var newValues = selectIndex(index);
        if (newValues) {
            handleChange(e, index, newValues);
        }
    };
    return (react_1.default.createElement(Container, __assign({}, rest, { className: (0, classnames_1.default)(className, 'menu') }),
        react_1.default.createElement("div", { className: "menu__items", role: "menu", ref: forwardedRef }, childrenArray.map(function (child, i) {
            var _a = child.props, _b = _a.onClick, onItemClick = _b === void 0 ? function () { } : _b, _c = _a.onFocus, onItemFocus = _c === void 0 ? function () { } : _c, _d = _a.onKeyDown, onItemKeyDown = _d === void 0 ? function () { } : _d, itemRest = __rest(_a, ["onClick", "onFocus", "onKeyDown"]);
            return (0, react_1.cloneElement)(child, __assign(__assign({}, itemRest), { type: type, focused: i === focusedIndex, tabIndex: focusedIndex === undefined ? 0 : -1, checked: checkedIndexes[i], onFocus: function (e) {
                    setFocusedIndex(i);
                    onItemFocus(e);
                }, onClick: function (e) {
                    handleClick(e, i);
                    onItemClick(e);
                    onClick(e);
                }, onKeyDown: function (e) {
                    handleKeyDown(e, i);
                    onItemKeyDown(e);
                } }));
        }))));
};
exports.default = (0, component_utils_1.withForwardRef)(EbayMenu);
