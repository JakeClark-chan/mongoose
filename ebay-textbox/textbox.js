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
exports.isControlled = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var component_utils_1 = require("../common/component-utils");
var index_1 = require("./index");
var hooks_1 = require("../common/floating-label-utils/hooks");
var isControlled = function (value) { return typeof value !== 'undefined'; };
exports.isControlled = isControlled;
var EbayTextbox = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'text' : _b, invalid = _a.invalid, fluid = _a.fluid, multiline = _a.multiline, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c, _d = _a.onInputChange, onInputChange = _d === void 0 ? function () { } : _d, _e = _a.onFocus, onFocus = _e === void 0 ? function () { } : _e, _f = _a.onBlur, onBlur = _f === void 0 ? function () { } : _f, _g = _a.onKeyPress, onKeyPress = _g === void 0 ? function () { } : _g, _h = _a.onKeyUp, onKeyUp = _h === void 0 ? function () { } : _h, _j = _a.onKeyDown, onKeyDown = _j === void 0 ? function () { } : _j, _k = _a.onInvalid, onInvalid = _k === void 0 ? function () { } : _k, _l = _a.onFloatingLabelInit, onFloatingLabelInit = _l === void 0 ? function () { } : _l, _m = _a.onButtonClick, onButtonClick = _m === void 0 ? function () { } : _m, autoFocus = _a.autoFocus, _o = _a.defaultValue, defaultValue = _o === void 0 ? '' : _o, controlledValue = _a.value, forwardedRef = _a.forwardedRef, _p = _a.inputSize, inputSize = _p === void 0 ? 'default' : _p, floatingLabel = _a.floatingLabel, children = _a.children, placeholder = _a.placeholder, opaqueLabel = _a.opaqueLabel, rest = __rest(_a, ["type", "invalid", "fluid", "multiline", "onChange", "onInputChange", "onFocus", "onBlur", "onKeyPress", "onKeyUp", "onKeyDown", "onInvalid", "onFloatingLabelInit", "onButtonClick", "autoFocus", "defaultValue", "value", "forwardedRef", "inputSize", "floatingLabel", "children", "placeholder", "opaqueLabel"]);
    var _q = (0, react_1.useState)(defaultValue), value = _q[0], setValue = _q[1];
    var _r = (0, react_1.useState)(defaultValue), inputValue = _r[0], setInputValue = _r[1];
    var _s = (0, hooks_1.useFloatingLabel)({
        ref: forwardedRef,
        inputId: rest.id,
        className: rest.className,
        disabled: rest.disabled,
        label: floatingLabel,
        inputSize: inputSize,
        inputValue: controlledValue || inputValue,
        placeholder: placeholder,
        invalid: invalid,
        type: type,
        opaqueLabel: opaqueLabel,
        onMount: onFloatingLabelInit
    }), label = _s.label, Container = _s.Container, onFloatingLabelBlur = _s.onBlur, onFloatingLabelFocus = _s.onFocus, ref = _s.ref, floatingLabelPlaceholder = _s.placeholder;
    var handleFocus = function (event) {
        var _a;
        onFocus(event, { value: ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value) || defaultValue });
        onFloatingLabelFocus();
    };
    var handleBlur = function (event) {
        var _a;
        var newValue = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
        onBlur(event, { value: newValue });
        if (newValue !== value) {
            onChange(event, { value: newValue });
            setValue(newValue);
        }
        onFloatingLabelBlur();
    };
    var handleKeyPress = function (event) {
        var textbox = event.target;
        onKeyPress(event, { value: textbox === null || textbox === void 0 ? void 0 : textbox.value });
    };
    var handleKeyUp = function (event) {
        var textbox = event.target;
        onKeyUp(event, { value: textbox === null || textbox === void 0 ? void 0 : textbox.value });
    };
    var handleKeyDown = function (event) {
        var textbox = event.target;
        onKeyDown(event, { value: textbox === null || textbox === void 0 ? void 0 : textbox.value });
    };
    var handleInvalid = function (event) {
        var textbox = event.target;
        onInvalid(event, { value: textbox === null || textbox === void 0 ? void 0 : textbox.value });
    };
    var handleButtonClick = function (event) {
        onButtonClick(event, { value: value });
    };
    (0, react_1.useEffect)(function () {
        if (autoFocus) {
            handleFocus();
        }
    }, []);
    var handleInputChange = function (e) {
        var _a;
        var newValue = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
        if (!(0, exports.isControlled)(controlledValue)) {
            setInputValue(newValue);
        }
        onInputChange(e, { value: newValue });
    };
    var Input = multiline ? 'textarea' : 'input';
    var Wrapper = fluid ? 'div' : 'span';
    var prefixIcon = (0, component_utils_1.findComponent)(children, index_1.EbayTextboxPrefixIcon);
    var postfixIcon = (0, component_utils_1.findComponent)(children, index_1.EbayTextboxPostfixIcon);
    var inputClassName = (0, classnames_1.default)('textbox__control', {
        'textbox__control--fluid': fluid,
        'textbox__control--large': inputSize === 'large'
    });
    var wrapperClassName = (0, classnames_1.default)('textbox', rest.className, {
        'textbox--icon-end': postfixIcon
    });
    return (react_1.default.createElement(Container, null,
        label,
        react_1.default.createElement(Wrapper, { className: wrapperClassName },
            prefixIcon,
            react_1.default.createElement(Input, __assign({}, rest, { className: inputClassName, type: type, "aria-invalid": invalid, value: (0, exports.isControlled)(controlledValue) ? controlledValue : inputValue, onChange: handleInputChange, onBlur: handleBlur, onFocus: handleFocus, onKeyPress: handleKeyPress, onKeyUp: handleKeyUp, onKeyDown: handleKeyDown, onInvalid: handleInvalid, autoFocus: autoFocus, ref: ref, placeholder: floatingLabelPlaceholder })),
            postfixIcon && (0, react_1.cloneElement)(postfixIcon, __assign(__assign({}, postfixIcon.props), { onClick: function (e) {
                    var _a = postfixIcon.props.onClick, iconClick = _a === void 0 ? function () { } : _a;
                    iconClick(e);
                    handleButtonClick(e);
                } })))));
};
exports.default = (0, component_utils_1.withForwardRef)(EbayTextbox);
