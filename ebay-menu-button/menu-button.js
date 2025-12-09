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
var classnames_1 = __importDefault(require("classnames"));
var component_utils_1 = require("../common/component-utils");
var ebay_menu_1 = require("../ebay-menu");
var ebay_button_1 = require("../ebay-button");
var ebay_icon_button_1 = require("../ebay-icon-button");
var ebay_icon_1 = require("../ebay-icon");
var index_1 = require("./index");
var random_id_1 = require("../common/random-id");
var event_utils_1 = require("../common/event-utils");
var EbayMenuButton = function (_a) {
    var type = _a.type, _b = _a.variant, variant = _b === void 0 ? 'button' : _b, className = _a.className, _c = _a.text, text = _c === void 0 ? '' : _c, fixWidth = _a.fixWidth, reverse = _a.reverse, defaultExpanded = _a.expanded, noToggleIcon = _a.noToggleIcon, checked = _a.checked, collapseOnSelect = _a.collapseOnSelect, a11yText = _a.a11yText, prefixId = _a.prefixId, prefixLabel = _a.prefixLabel, _d = _a.onClick, onClick = _d === void 0 ? function () { } : _d, _e = _a.onExpand, onExpand = _e === void 0 ? function () { } : _e, _f = _a.onCollapse, onCollapse = _f === void 0 ? function () { } : _f, _g = _a.onChange, onChange = _g === void 0 ? function () { } : _g, _h = _a.onSelect, onSelect = _h === void 0 ? function () { } : _h, children = _a.children, rest = __rest(_a, ["type", "variant", "className", "text", "fixWidth", "reverse", "expanded", "noToggleIcon", "checked", "collapseOnSelect", "a11yText", "prefixId", "prefixLabel", "onClick", "onExpand", "onCollapse", "onChange", "onSelect", "children"]);
    var _j = (0, react_1.useState)(defaultExpanded), expanded = _j[0], setExpanded = _j[1];
    var _k = (0, react_1.useState)(), menuId = _k[0], setMenuId = _k[1];
    var buttonRef = (0, react_1.useRef)(null);
    var menuRef = (0, react_1.useRef)();
    var menuItems = (0, component_utils_1.filterByType)(children, [index_1.EbayMenuButtonItem, index_1.EbayMenuButtonSeparator]);
    var defaultIndexes = menuItems.map(function (item) { return Boolean(item.props.checked); });
    var _l = (0, react_1.useState)(defaultIndexes), checkedIndexes = _l[0], setCheckedIndexes = _l[1];
    var menuButtonLabel = (0, component_utils_1.findComponent)(children, index_1.EbayMenuButtonLabel);
    var icon = (0, component_utils_1.findComponent)(children, ebay_icon_1.EbayIcon);
    var label = labelWithPrefixAndIcon({ text: text, prefixId: prefixId, prefixLabel: prefixLabel, menuButtonLabel: menuButtonLabel, icon: icon });
    var wrapperClasses = (0, classnames_1.default)('menu-button', className);
    var menuClasses = (0, classnames_1.default)('menu-button__menu', {
        'menu-button__menu--fix-width': fixWidth,
        'menu-button__menu--reverse': reverse
    });
    (0, react_1.useEffect)(function () {
        var handleBackgroundClick = function (e) {
            var menuEl = menuRef.current;
            var menuClicked = menuEl && menuEl.contains(e.target);
            if (collapseOnSelect || !menuClicked) {
                setExpanded(false);
            }
        };
        if (expanded) {
            onExpand();
            // On React 18 useEffect hooks runs synchronous instead of asynchronous as React 17 or prior
            // causing the event listener to be attached to the document at the same time that the dialog
            // opens. Adding a timeout so the event is attached after the click event that opened the modal
            // is finished.
            setTimeout(function () {
                document.addEventListener('click', handleBackgroundClick, false);
            });
        }
        else if (expanded === false) {
            onCollapse();
        }
        return function () { return document.removeEventListener('click', handleBackgroundClick, false); };
    }, [expanded]);
    (0, react_1.useEffect)(function () {
        setMenuId((0, random_id_1.randomId)());
    }, []);
    var handleMenuKeydown = function (e) {
        (0, event_utils_1.handleEscapeKeydown)(e, function () {
            var _a;
            setExpanded(false);
            (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        });
    };
    var buttonProps = __assign({ ref: buttonRef, className: 'menu-button__button', 'aria-expanded': !!expanded, 'aria-haspopup': true, 'aria-label': a11yText, 'aria-controls': menuId, 'aria-labelledby': prefixId, onClick: function (e) {
            setExpanded(!expanded);
            onClick(e);
        } }, rest);
    var handleOnChange = function (e, eventProps) {
        if (type === 'radio' || type === 'checkbox') {
            var newCheckedIndexes = checkedIndexes.map(function (_, i) { return eventProps.indexes.includes(i); });
            setCheckedIndexes(newCheckedIndexes);
        }
        onChange(e, eventProps);
    };
    var checkedIndex = function () {
        var index = checkedIndexes.findIndex(Boolean);
        return index > -1 ? index : checked;
    };
    return (react_1.default.createElement("span", { className: wrapperClasses },
        variant === 'overflow' ?
            react_1.default.createElement(ebay_icon_button_1.EbayIconButton, __assign({ icon: "overflowVertical16" }, buttonProps)) :
            react_1.default.createElement(ebay_button_1.EbayButton, __assign({ variant: variant === 'form' ? 'form' : undefined, bodyState: noToggleIcon ? undefined : 'expand' }, buttonProps), label),
        expanded &&
            react_1.default.createElement(ebay_menu_1.EbayMenu, { baseEl: "div", ref: menuRef, type: type, className: menuClasses, tabIndex: -1, id: menuId, autofocus: true, checked: checkedIndex(), onKeyDown: handleMenuKeydown, onChange: handleOnChange, onSelect: onSelect }, menuItems.map(function (item, i) {
                return (0, react_1.cloneElement)(item, __assign(__assign({}, item.props), { className: (0, classnames_1.default)(item.props.className, 'menu-button__item'), key: i, checked: checkedIndexes[i] }));
            }))));
};
function labelWithPrefixAndIcon(_a) {
    var text = _a.text, prefixId = _a.prefixId, prefixLabel = _a.prefixLabel, menuButtonLabel = _a.menuButtonLabel, icon = _a.icon;
    var textLabelElement = text.length ? react_1.default.createElement("span", null, text) : null;
    var prefixLabelElement = !prefixId && prefixLabel && [
        react_1.default.createElement("span", { className: "menu-button-prefix-label" }, prefixLabel),
        react_1.default.createElement(react_1.default.Fragment, null, "\u00A0")
    ];
    var labelWithPrefix = [prefixLabelElement, menuButtonLabel || textLabelElement];
    var labelArray = [icon, labelWithPrefix].flat().filter(Boolean);
    return labelArray.length ? labelArray : null;
}
exports.default = EbayMenuButton;
