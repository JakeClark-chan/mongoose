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
var ebay_icon_1 = require("../ebay-icon");
var component_utils_1 = require("../common/component-utils");
var listbox_button_option_1 = __importDefault(require("./listbox-button-option"));
var ListboxButton = function (_a) {
    var children = _a.children, name = _a.name, value = _a.value, selected = _a.selected, borderless = _a.borderless, fluid = _a.fluid, className = _a.className, maxHeight = _a.maxHeight, prefixId = _a.prefixId, prefixLabel = _a.prefixLabel, floatingLabel = _a.floatingLabel, _b = _a.unselectedText, unselectedText = _b === void 0 ? '-' : _b, _c = _a.onChange, onChange = _c === void 0 ? function () { } : _c, _d = _a.onCollapse, onCollapse = _d === void 0 ? function () { } : _d, _e = _a.onExpand, onExpand = _e === void 0 ? function () { } : _e, rest = __rest(_a, ["children", "name", "value", "selected", "borderless", "fluid", "className", "maxHeight", "prefixId", "prefixLabel", "floatingLabel", "unselectedText", "onChange", "onCollapse", "onExpand"]);
    var optionsContainerRef = (0, react_1.useRef)(null);
    var optionsParentContainerRef = (0, react_1.useRef)();
    var optionsByIndexRef = (0, react_1.useRef)(new Map());
    var buttonRef = (0, react_1.useRef)();
    var listBoxButtonOptions = (0, component_utils_1.filterByType)(children, listbox_button_option_1.default);
    if (!listBoxButtonOptions.length) {
        throw new Error("EbayListboxButton: Please use a\n        EbayListboxButtonOption that defines the options of the listbox");
    }
    var getInitialSelectedOption = function () {
        var selectedIndex = selected !== undefined ? selected : listBoxButtonOptions.findIndex(function (_a) {
            var props = _a.props;
            return value !== undefined && props.value === value;
        });
        var index = selectedIndex > -1 || floatingLabel ? selectedIndex : undefined;
        return {
            option: listBoxButtonOptions[index],
            index: index
        };
    };
    // Get the default Selected value and set it in the state
    var _f = getInitialSelectedOption(), selectedOptionFromValue = _f.option, initialSelectedOptionIndex = _f.index;
    // Update the selected option to the state
    var _g = (0, react_1.useState)(selectedOptionFromValue), selectedOption = _g[0], setSelectedOption = _g[1];
    var _h = (0, react_1.useState)(initialSelectedOptionIndex), selectedIndex = _h[0], setSelectedIndex = _h[1];
    // Update the expanded status to the state
    var _j = (0, react_1.useState)(), expanded = _j[0], setExpanded = _j[1];
    // Additional flag to avoid multiple re-render when users tries to open and close
    var _k = (0, react_1.useState)(false), optionsOpened = _k[0], setOptionsOpened = _k[1];
    var _l = (0, react_1.useState)(), wasClicked = _l[0], setWasClicked = _l[1];
    (0, react_1.useEffect)(function () {
        setSelectedOption(selectedOptionFromValue);
    }, [value]);
    var childrenArray = react_1.Children.toArray(children);
    var getSelectedValueByIndex = function (index) { return childrenArray[index].props.value; };
    var getIndexByValue = (0, react_1.useCallback)(function (selectedValue) {
        return childrenArray.findIndex(function (_a) {
            var props = _a.props;
            return props.value === selectedValue;
        });
    }, [childrenArray]);
    var getSelectedOption = function (currentIndex) { return optionsByIndexRef.current.get(currentIndex); };
    var setActiveDescendant = function (index) {
        var optionsContainerEle = optionsContainerRef.current;
        optionsContainerEle === null || optionsContainerEle === void 0 ? void 0 : optionsContainerEle.setAttribute("aria-activedescendant", getSelectedOption(index).id);
    };
    var collapseListbox = function () {
        setExpanded(false);
        onCollapse();
    };
    var expandListbox = function () {
        setExpanded(true);
        onExpand();
    };
    var toggleListbox = function () {
        if (expanded) {
            collapseListbox();
        }
        else {
            expandListbox();
        }
    };
    var onOptionsSelect = function (e, index) {
        // OnSelect set the selectedValue to the state and expanded to false to close the list box
        setSelectedOption(childrenArray[index]);
        setSelectedIndex(index);
        collapseListbox();
        setActiveDescendant(index);
        buttonRef.current.focus();
        onChange(e, { index: index, selected: [getSelectedValueByIndex(index)], wasClicked: wasClicked });
        setWasClicked(false);
    };
    var reset = function () {
        collapseListbox();
        setSelectedOption(childrenArray[initialSelectedOptionIndex]);
    };
    var makeOptionActive = function (index) {
        var optionEle = optionsContainerRef.current.children[index];
        optionEle.setAttribute("aria-selected", 'true');
        optionEle.classList.add("listbox-button__option--active");
    };
    var makeOptionInActive = function (index) {
        var optionEle = optionsContainerRef.current.children[index];
        optionEle.setAttribute("aria-selected", 'false');
        optionEle.classList.remove("listbox-button__option--active");
    };
    // Followed the implementation from W3
    // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
    var scrollOptions = function (index) {
        var listboxOptionsContainerNode = optionsParentContainerRef.current;
        var currentTarget = getSelectedOption(index);
        if (listboxOptionsContainerNode.scrollHeight > listboxOptionsContainerNode.clientHeight) {
            var scrollBottom = listboxOptionsContainerNode.clientHeight + listboxOptionsContainerNode.scrollTop;
            var elementBottom = currentTarget.offsetTop + currentTarget.offsetHeight;
            if (elementBottom > scrollBottom) {
                listboxOptionsContainerNode.scrollTop = elementBottom - listboxOptionsContainerNode.clientHeight;
            }
            else if (currentTarget.offsetTop < listboxOptionsContainerNode.scrollTop) {
                listboxOptionsContainerNode.scrollTop = currentTarget.offsetTop;
            }
        }
    };
    var makeSelections = function (updatedIndex) {
        makeOptionActive(selectedIndex === undefined || updatedIndex === -1 ? 0 : updatedIndex);
        makeOptionInActive(selectedIndex === undefined || selectedIndex === -1 ? 0 : selectedIndex);
        scrollOptions(updatedIndex);
        setActiveDescendant(updatedIndex);
        setSelectedIndex(updatedIndex);
        setSelectedOption(childrenArray[updatedIndex]);
    };
    var focusOptionsContainer = function (focusOptions) {
        return setTimeout(function () { var _a; return (_a = optionsContainerRef === null || optionsContainerRef === void 0 ? void 0 : optionsContainerRef.current) === null || _a === void 0 ? void 0 : _a.focus(focusOptions); }, 0);
    };
    var onButtonClick = function () {
        toggleListbox();
        setOptionsOpened(true);
        focusOptionsContainer({ preventScroll: true });
    };
    var onButtonKeyup = function (e) {
        switch (e.key) {
            case 'Escape':
                collapseListbox();
                break;
            case 'Enter':
                focusOptionsContainer();
                break;
            default:
                break;
        }
    };
    var onOptionContainerKeydown = function (e) {
        switch (e.key) {
            case ' ':
            case 'PageUp':
            case 'PageDown':
            case 'Home':
            case 'End':
                e.preventDefault();
                break;
            case 'Down':
            case 'ArrowDown':
                e.preventDefault();
                if (selectedIndex !== listBoxButtonOptions.length - 1) {
                    makeSelections(selectedIndex < listBoxButtonOptions.length - 1 ? selectedIndex + 1 : 0);
                }
                break;
            case 'Up':
            case 'ArrowUp':
                e.preventDefault();
                if (selectedIndex !== 0) {
                    makeSelections(selectedIndex > 0 ? selectedIndex - 1 : listBoxButtonOptions.length - 1);
                }
                break;
            case 'Enter':
                collapseListbox();
                setTimeout(function () { return setSelectedOption(childrenArray[selectedIndex]); });
                setTimeout(function () { return buttonRef.current.focus(); }, 0);
                onChange(e, {
                    index: selectedIndex,
                    selected: [getSelectedValueByIndex(selectedIndex)],
                    wasClicked: wasClicked
                });
                break;
            case 'Esc':
            case 'Escape':
                reset();
                break;
            default:
                break;
        }
    };
    // We want to mimic the select box behavior, so we take the onSelect that passed
    // at the parent level and use it for the OnClick on the list box since it is a fake dropdown
    var updateListBoxButtonOptions = listBoxButtonOptions
        .map(function (child, index) { return (0, react_1.cloneElement)(child, {
        index: index,
        key: index,
        selected: selectedOption && child.props.value === selectedOption.props.value,
        onClick: function (e) { return onOptionsSelect(e, index); },
        innerRef: function (optionNode) { return !optionNode
            ? optionsByIndexRef.current.delete(index)
            : optionsByIndexRef.current.set(index, optionNode); }
    }); });
    var wrapperClassName = (0, classnames_1.default)('listbox-button', className, { 'listbox-button--fluid': fluid });
    var buttonClassName = (0, classnames_1.default)('btn btn--form', {
        'btn--borderless': borderless,
        'btn--floating-label': floatingLabel && selectedOption
    });
    var expandBtnTextId = prefixId && 'expand-btn-text';
    var buttonLabel = (react_1.default.createElement(react_1.default.Fragment, null,
        floatingLabel && react_1.default.createElement("span", { className: "btn__floating-label" }, floatingLabel),
        prefixLabel && react_1.default.createElement("span", { className: "btn__label" }, prefixLabel),
        react_1.default.createElement("span", { className: "btn__text", id: expandBtnTextId }, (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.children) || unselectedText)));
    return (react_1.default.createElement("span", { className: wrapperClassName },
        react_1.default.createElement("button", __assign({}, rest, { type: "button", className: buttonClassName, "aria-expanded": !!expanded, "aria-haspopup": "listbox", "aria-labelledby": prefixId && "".concat(prefixId, " ").concat(expandBtnTextId), onClick: onButtonClick, 
            // https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
            onMouseDown: function (e) { return e.preventDefault(); }, onKeyUp: onButtonKeyup, ref: buttonRef }),
            react_1.default.createElement("span", { className: "btn__cell" },
                buttonLabel,
                react_1.default.createElement(ebay_icon_1.EbayIcon, { name: "chevronDown12" }))),
        (expanded || optionsOpened) &&
            react_1.default.createElement("div", { className: "listbox-button__listbox", ref: optionsParentContainerRef, style: { maxHeight: maxHeight } },
                react_1.default.createElement("div", { className: "listbox-button__options", role: "listbox", tabIndex: expanded ? 0 : -1, ref: optionsContainerRef, onKeyDown: function (e) { return onOptionContainerKeydown(e); }, 
                    // adding onMouseDown preventDefault b/c on IE the onClick event is not being fired on each
                    // option https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
                    onMouseDown: function (e) {
                        e.preventDefault();
                        setWasClicked(true);
                    }, onBlur: function () {
                        collapseListbox();
                        setTimeout(function () { return buttonRef.current.focus(); }, 0);
                    } }, updateListBoxButtonOptions)),
        react_1.default.createElement("select", { hidden: true, className: "listbox-button__native", name: name, onChange: function (e) { return onOptionsSelect(e, getIndexByValue(e.target.value)); }, value: selectedOption ? selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.props.value : '' }, updateListBoxButtonOptions.map(function (option, i) {
            return react_1.default.createElement("option", { value: option.props.value, key: i });
        }))));
};
exports.default = ListboxButton;
