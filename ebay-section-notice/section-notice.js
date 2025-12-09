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
var ebay_notice_content_1 = require("../ebay-notice-base/components/ebay-notice-content");
var notice_content_1 = __importDefault(require("../common/notice-utils/notice-content"));
var ebay_icon_1 = require("../ebay-icon");
var index_1 = require("./index");
var EbaySectionNotice = function (_a) {
    var _b;
    var _c = _a.status, status = _c === void 0 ? 'general' : _c, children = _a.children, className = _a.className, ariaLabel = _a["aria-label"], _d = _a["aria-roledescription"], ariaRoleDescription = _d === void 0 ? 'Notice' : _d, a11yDismissText = _a.a11yDismissText, educationIcon = _a.educationIcon, iconClass = _a.iconClass, prominent = _a.prominent, _e = _a.onDismiss, onDismiss = _e === void 0 ? function () { } : _e, rest = __rest(_a, ["status", "children", "className", 'aria-label', 'aria-roledescription', "a11yDismissText", "educationIcon", "iconClass", "prominent", "onDismiss"]);
    var _f = (0, react_1.useState)(false), dismissed = _f[0], setDismissed = _f[1];
    var childrenArray = react_1.default.Children.toArray(children);
    var content = childrenArray.find(function (_a) {
        var type = _a.type;
        return type === ebay_notice_content_1.EbayNoticeContent;
    });
    var hasStatus = status !== 'general' && status !== 'none';
    var isEducational = status === 'education';
    var iconName = null;
    if (hasStatus) {
        if (isEducational) {
            iconName = educationIcon || 'lightbulb24';
        }
        else {
            iconName = "".concat(status, "Filled16");
        }
    }
    if (!content) {
        throw new Error("EbaySectionNotice: Please use a EbayNoticeContent that defines the content of the notice");
    }
    var handleDismissed = function (event) {
        setDismissed(true);
        onDismiss(event);
    };
    return dismissed ? null : (react_1.default.createElement("section", __assign({}, rest, { className: (0, classnames_1.default)(className, "section-notice", (_b = {},
            _b["section-notice--".concat(status)] = hasStatus,
            _b['section-notice--education'] = isEducational && prominent,
            _b['section-notice--large-icon'] = isEducational,
            _b)), role: "region", "aria-label": !hasStatus ? ariaLabel : null, "aria-labelledby": hasStatus ? "section-notice-".concat(status) : null, "aria-roledescription": ariaRoleDescription }),
        iconName && (react_1.default.createElement("div", { className: "section-notice__header", id: "section-notice-".concat(status) },
            react_1.default.createElement(ebay_icon_1.EbayIcon, { className: iconClass, name: iconName, a11yText: ariaLabel, a11yVariant: "label" }))),
        react_1.default.createElement(notice_content_1.default, __assign({}, content.props, { type: "section" })),
        children,
        a11yDismissText && (react_1.default.createElement(index_1.EbaySectionNoticeFooter, null,
            react_1.default.createElement("button", { "aria-label": a11yDismissText, className: "fake-link page-notice__dismiss", onClick: handleDismissed },
                react_1.default.createElement(ebay_icon_1.EbayIcon, { name: "close16" }))))));
};
exports.default = EbaySectionNotice;
