"use strict";
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
var react_1 = require("react");
var use_key_press_1 = __importDefault(require("./use-key-press"));
var useRovingIndex = function (children, FocusableType, defaultValue) {
    var _a = (0, react_1.useState)(defaultValue), rovingIndex = _a[0], setRovingIndex = _a[1];
    var _b = (0, use_key_press_1.default)(), arrowUpPressed = _b[0], arrowDownPressed = _b[1];
    var rovingIndexArray = react_1.Children
        .toArray(children)
        .reduce(function (focusables, child, i) {
        return child.type === FocusableType ? __spreadArray(__spreadArray([], focusables, true), [i], false) : focusables;
    }, []);
    var currentIndex = rovingIndexArray.indexOf(rovingIndex);
    var previousOrCurrent = function () {
        if (currentIndex === -1)
            return rovingIndex;
        var previousRovingIndex = rovingIndexArray[currentIndex - 1];
        return previousRovingIndex === undefined ? rovingIndex : previousRovingIndex;
    };
    var nextOrCurrent = function () {
        if (currentIndex === -1)
            return rovingIndex;
        var nextRovingIndex = rovingIndexArray[currentIndex + 1];
        return nextRovingIndex === undefined ? rovingIndex : nextRovingIndex;
    };
    (0, react_1.useEffect)(function () {
        if (arrowUpPressed)
            setRovingIndex(previousOrCurrent());
        if (arrowDownPressed)
            setRovingIndex(nextOrCurrent());
    }, [arrowUpPressed, arrowDownPressed]);
    return [rovingIndex, setRovingIndex];
};
exports.default = useRovingIndex;
