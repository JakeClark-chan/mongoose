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
var isControlled = function (checked) { return typeof checked !== 'undefined'; };
var EbaySwitch = function (_a) {
    var id = _a.id, value = _a.value, name = _a.name, className = _a.className, checked = _a.checked, _b = _a.defaultChecked, defaultChecked = _b === void 0 ? false : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c, rest = __rest(_a, ["id", "value", "name", "className", "checked", "defaultChecked", "onChange"]);
    var _d = (0, react_1.useState)(defaultChecked), isChecked = _d[0], setChecked = _d[1];
    (0, react_1.useEffect)(function () {
        setChecked(!!checked);
    }, [checked]);
    var handleChange = function (e) {
        var _a = e.target || {}, _b = _a.value, inputValue = _b === void 0 ? '' : _b, _c = _a.checked, inputChecked = _c === void 0 ? false : _c;
        onChange(e, {
            value: inputValue,
            checked: inputChecked
        });
        setChecked(inputChecked);
    };
    return (react_1.default.createElement("span", { className: "switch" },
        react_1.default.createElement("input", __assign({}, rest, { className: (0, classnames_1.default)('switch__control', className), id: id, role: "switch", type: "checkbox", value: value, "aria-checked": isControlled(checked) ? checked : isChecked, checked: isControlled(checked) ? checked : isChecked, name: name, onChange: handleChange })),
        react_1.default.createElement("span", { className: "switch__button" })));
};
exports.default = EbaySwitch;
