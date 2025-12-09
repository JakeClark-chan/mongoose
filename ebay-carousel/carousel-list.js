"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var helpers_1 = require("./helpers");
var scroll_to_transition_1 = require("./scroll-to-transition");
var CarouselList = function (_a) {
    var _b = _a.gap, gap = _b === void 0 ? 16 : _b, itemsPerSlide = _a.itemsPerSlide, slideWidth = _a.slideWidth, offset = _a.offset, activeIndex = _a.activeIndex, nextControlDisabled = _a.nextControlDisabled, className = _a.className, itemsRef = _a.itemsRef, children = _a.children, onSetActiveIndex = _a.onSetActiveIndex, onScroll = _a.onScroll;
    var _c = (0, react_1.useState)(0), translateLeft = _c[0], setTranslateLeft = _c[1];
    var _d = (0, react_1.useState)(false), skipScrolling = _d[0], setSkipScrolling = _d[1];
    var _e = (0, react_1.useState)(false), scrollTransitioning = _e[0], setScrollTransitioning = _e[1];
    var listRef = (0, react_1.useRef)(null);
    var scrollTimeout = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var size = react_1.Children.count(children);
        if (!size || !listRef.current)
            return;
        if (skipScrolling) {
            setSkipScrolling(false);
            return;
        }
        var list = listRef.current;
        var isNativeScroll = (0, helpers_1.isNativeScrolling)(list);
        if (isNativeScroll) {
            setScrollTransitioning(true);
            (0, scroll_to_transition_1.scrollTransition)(list, offset, function () { return setScrollTransitioning(false); });
        }
        else {
            setTranslateLeft(offset);
        }
    }, [offset]);
    var handleFinishScrolling = (0, react_1.useCallback)(function () {
        var scrollLeft = listRef.current.scrollLeft;
        var closest = (0, helpers_1.getClosestIndex)(scrollLeft, itemsRef.current, slideWidth, itemsPerSlide, gap);
        if (closest !== activeIndex) {
            setSkipScrolling(true);
            onSetActiveIndex(closest);
            onScroll({ index: closest });
        }
    }, [listRef.current, itemsRef.current, slideWidth, activeIndex, onSetActiveIndex]);
    var handleScroll = function () {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(function () {
            if (!scrollTransitioning) {
                handleFinishScrolling();
            }
        }, 640);
    };
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('carousel__viewport', {
            'carousel__viewport--mask': !nextControlDisabled
        }, className) },
        react_1.default.createElement("ul", { className: "carousel__list", ref: listRef, onScroll: handleScroll, style: { transform: "translate3d(".concat(-translateLeft, "px, 0, 0)") } }, (0, helpers_1.alterChildren)(children, itemsRef, itemsPerSlide, slideWidth, offset, gap))));
};
exports.default = CarouselList;
