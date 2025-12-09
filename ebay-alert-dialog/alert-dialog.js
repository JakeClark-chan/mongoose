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
var ebay_dialog_base_1 = require("../ebay-dialog-base");
var ebay_button_1 = require("../ebay-button");
var classPrefix = 'alert-dialog';
var EbayAlertDialog = function (_a) {
    var _b = _a.a11yCloseText, a11yCloseText = _b === void 0 ? 'Close Dialog' : _b, confirmText = _a.confirmText, _c = _a.onConfirm, onConfirm = _c === void 0 ? function () { } : _c, rest = __rest(_a, ["a11yCloseText", "confirmText", "onConfirm"]);
    var confirmBtnRef = (0, react_1.useRef)(null);
    var confirmId = 'alert-dialog-confirm';
    var mainId = 'alert-dialog-main';
    return (react_1.default.createElement(ebay_dialog_base_1.DialogBaseWithState, __assign({ focus: confirmBtnRef }, rest, { a11yCloseText: a11yCloseText, role: "alertdialog", classPrefix: classPrefix, ignoreEscape: true, mainId: mainId, buttonPosition: "hidden", className: (0, classnames_1.default)(rest.className, "".concat(classPrefix, "--mask-fade")), windowClass: "".concat(classPrefix, "__window ").concat(classPrefix, "__window--fade") }),
        rest.children,
        react_1.default.createElement(ebay_dialog_base_1.EbayDialogFooter, null,
            react_1.default.createElement(ebay_button_1.EbayButton, { priority: "primary", "aria-describedby": mainId, onClick: onConfirm, ref: confirmBtnRef, id: confirmId, className: "alert-dialog__acknowledge" }, confirmText))));
};
exports.default = EbayAlertDialog;
