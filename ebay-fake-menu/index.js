"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbayFakeMenuSeparator = exports.EbayFakeMenuItem = exports.EbayFakeMenu = void 0;
var menu_1 = require("./menu");
Object.defineProperty(exports, "EbayFakeMenu", { enumerable: true, get: function () { return __importDefault(menu_1).default; } });
var menu_item_1 = require("./menu-item");
Object.defineProperty(exports, "EbayFakeMenuItem", { enumerable: true, get: function () { return __importDefault(menu_item_1).default; } });
var menu_item_separator_1 = require("./menu-item-separator");
Object.defineProperty(exports, "EbayFakeMenuSeparator", { enumerable: true, get: function () { return __importDefault(menu_item_separator_1).default; } });
