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
var react_1 = __importDefault(require("react"));
var component_utils_1 = require("../common/component-utils");
var ebay_button_1 = require("../ebay-button");
var ebay_menu_button_1 = require("../ebay-menu-button");
var EbaySplitButton = function (_a) {
    var a11yMenuText = _a.a11yMenuText, children = _a.children, type = _a.type, bodyState = _a.bodyState, a11yButtonLoadingText = _a.a11yButtonLoadingText, onCollapse = _a.onCollapse, onExpand = _a.onExpand, _b = _a.onSelect, onSelect = _b === void 0 ? function () { } : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c, ref = _a.ref, rest = __rest(_a, ["a11yMenuText", "children", "type", "bodyState", "a11yButtonLoadingText", "onCollapse", "onExpand", "onSelect", "onChange", "ref"]);
    var menuItemComponents = [ebay_menu_button_1.EbayMenuButtonItem, ebay_menu_button_1.EbayMenuButtonSeparator];
    var buttonLabel = (0, component_utils_1.filterBy)(children, function (el) { return !menuItemComponents.includes(el.type); });
    var menuItems = (0, component_utils_1.filterByType)(children, menuItemComponents);
    return (react_1.default.createElement("span", { className: "split-button" },
        react_1.default.createElement(ebay_button_1.EbayButton, __assign({ "aria-label": bodyState === 'loading' ? a11yButtonLoadingText : undefined }, rest, { split: "start", bodyState: bodyState === 'expand' ? undefined : bodyState }), buttonLabel),
        react_1.default.createElement(ebay_menu_button_1.EbayMenuButton, { priority: rest.priority, disabled: rest.disabled, transparent: rest.transparent, size: rest.size, type: type, split: "end", reverse: true, a11yText: a11yMenuText, onCollapse: onCollapse, onExpand: onExpand, onSelect: onSelect, onChange: onChange }, menuItems)));
};
exports.default = EbaySplitButton;
