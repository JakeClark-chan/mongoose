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
var ebay_fake_menu_button_1 = require("../ebay-fake-menu-button");
var classnames_1 = __importDefault(require("classnames"));
var debounce_1 = require("../common/debounce");
var helpers_1 = require("./helpers");
var component_utils_1 = require("../common/component-utils");
var ebay_icon_1 = require("../ebay-icon");
var EbayPagination = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'ebay-pagination' : _b, className = _a.className, _c = _a.a11yCurrentText, a11yCurrentText = _c === void 0 ? 'Pagination - Current Page' : _c, _d = _a.a11yPreviousText, a11yPreviousText = _d === void 0 ? 'Previous page' : _d, _e = _a.a11yNextText, a11yNextText = _e === void 0 ? 'Next page' : _e, _f = _a.variant, variant = _f === void 0 ? 'show-range' : _f, _g = _a.fluid, fluid = _g === void 0 ? false : _g, _h = _a.onPrevious, onPrevious = _h === void 0 ? function () { } : _h, _j = _a.onNext, onNext = _j === void 0 ? function () { } : _j, _k = _a.onSelect, onSelect = _k === void 0 ? function () { } : _k, children = _a.children, rest = __rest(_a, ["id", "className", "a11yCurrentText", "a11yPreviousText", "a11yNextText", "variant", "fluid", "onPrevious", "onNext", "onSelect", "children"]);
    var paginationContainerRef = (0, react_1.useRef)(null);
    var childPageRefs = (0, react_1.useRef)([]);
    childPageRefs.current = react_1.Children.map(children, react_1.createRef);
    var totalPages = (0, component_utils_1.filterBy)(children, function (_a) {
        var props = _a.props;
        return props.type === undefined || props.type === 'page';
    }).length;
    var itemWidthRef = (0, react_1.useRef)(0);
    var arrowWidthRef = (0, react_1.useRef)(0);
    var getNumOfVisiblePageItems = function () {
        var _a, _b, _c, _d;
        var pageArrowWidth = arrowWidthRef.current || ((_b = (_a = childPageRefs.current[0]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.offsetWidth);
        arrowWidthRef.current = pageArrowWidth; // cache arrow width since it should be static
        var pageItemWidth = itemWidthRef.current || ((_d = (_c = childPageRefs.current[1]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.offsetWidth);
        itemWidthRef.current = pageItemWidth; // cache item width since it should be static
        return pageItemWidth ?
            Math.floor(((0, helpers_1.getMaxWidth)(paginationContainerRef.current) - pageArrowWidth * 2) / pageItemWidth) :
            0;
    };
    var _l = (0, react_1.useState)([]), page = _l[0], setPage = _l[1];
    var _m = (0, react_1.useState)(0), selectedIndex = _m[0], setSelectedIndex = _m[1];
    // selectedPageIndexFromDotMenu: override pageIndex on pagination with dot menu value
    var updatePages = function (selectedPageIndexFromDotMenu) {
        var selectedPageIndex = selectedPageIndexFromDotMenu || childPageRefs.current.findIndex(function (pageRef) { var _a; return ((_a = pageRef.current) === null || _a === void 0 ? void 0 : _a.getAttribute('aria-current')) === 'page'; });
        var visiblePageItems = getNumOfVisiblePageItems();
        var pageState = (0, helpers_1.calcPageState)(selectedPageIndex, visiblePageItems, totalPages, variant);
        setSelectedIndex(selectedPageIndex);
        setPage(__spreadArray(['hidden'], pageState, true));
    };
    (0, react_1.useEffect)(function () {
        var debouncedUpdate = (0, debounce_1.debounce)(updatePages, 16);
        updatePages();
        window.addEventListener('resize', function () { return debouncedUpdate(); });
        return function () {
            window.removeEventListener('resize', function () { return debouncedUpdate(); });
        };
    }, [children]);
    var createChildItems = function (itemType) {
        var pageIndex = 0;
        var firstDotItems = [];
        var secondDotItems = [];
        var allDotItems = [];
        var firstDot = page.indexOf('dots');
        var lastDot = page.lastIndexOf('dots');
        return react_1.Children.map(children, function (item, index) {
            var _a = item.props, _b = _a.type, type = _b === void 0 ? 'page' : _b, current = _a.current, disabled = _a.disabled, href = _a.href, text = _a.children;
            var isDot = page[index] === 'dots';
            var key = "".concat(id, "-item-").concat(index);
            var hide = page[index] === 'hidden';
            var isSeparator = isDot && type === 'page';
            var newProps = {
                current: current,
                disabled: disabled,
                href: href,
                type: isSeparator ? 'separator' : type,
                children: isDot ? react_1.default.createElement(ebay_icon_1.EbayIcon, { name: "overflowHorizontal24", focusable: false }) : text,
                pageIndex: type === 'page' ? pageIndex++ : undefined,
                key: key,
                hide: hide,
                onPrevious: onPrevious,
                onNext: onNext,
                onSelect: onSelect,
                a11yPreviousText: a11yPreviousText,
                a11yNextText: a11yNextText,
                ref: childPageRefs.current[index]
            };
            // include hidden numbers & number of (...)itself
            if ((hide || isDot) && type === 'page') {
                var itemComponent = (react_1.default.createElement(ebay_fake_menu_button_1.EbayFakeMenuButtonItem, { key: key, href: href, onClick: function (event) {
                        if (!href) {
                            event.preventDefault();
                        }
                        var currentTarget = event.currentTarget;
                        onSelect(event, { value: (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.innerText) || '', index: pageIndex });
                        updatePages(Number(currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.innerText));
                    } }, text));
                if (firstDot === lastDot) {
                    allDotItems.push(itemComponent);
                }
                if (selectedIndex - 2 > firstDot && index < selectedIndex) {
                    firstDotItems.push(itemComponent);
                }
                if (selectedIndex + 2 < lastDot && index > selectedIndex) {
                    secondDotItems.push(itemComponent);
                }
            }
            if (itemType === 'page' && isDot && variant === 'overflow') {
                var childComponent = allDotItems;
                if (firstDot !== lastDot) {
                    childComponent = index === 2 ? firstDotItems : secondDotItems;
                }
                return (react_1.default.createElement("li", { key: key },
                    react_1.default.createElement("span", { className: "pagination__item", role: "separator" },
                        react_1.default.createElement(ebay_fake_menu_button_1.EbayFakeMenuButton, { a11yText: "Menu", borderless: true, variant: "overflow", noToggleIcon: true }, childComponent))));
            }
            return itemType === type ? (0, react_1.cloneElement)(item, newProps) : null;
        });
    };
    var headingId = "".concat(id, "-pagination-heading");
    return (react_1.default.createElement("nav", __assign({}, rest, { role: "navigation", className: (0, classnames_1.default)(className, 'pagination', { 'pagination--fluid': fluid }), "aria-labelledby": headingId, ref: paginationContainerRef }),
        react_1.default.createElement("span", { "aria-live": "polite", role: "status" },
            react_1.default.createElement("h2", { className: "clipped", id: headingId }, a11yCurrentText)),
        createChildItems('previous'),
        react_1.default.createElement("ol", { className: "pagination__items" }, createChildItems('page')),
        createChildItems('next')));
};
exports.default = EbayPagination;
