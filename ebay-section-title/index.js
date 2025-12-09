"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbaySectionTitleOverflow = exports.EbaySectionTitleInfo = exports.EbaySectionTitleSubtitle = exports.EbaySectionTitleTitle = exports.EbaySectionTitle = void 0;
var section_title_1 = require("./section-title");
Object.defineProperty(exports, "EbaySectionTitle", { enumerable: true, get: function () { return __importDefault(section_title_1).default; } });
var title_1 = require("./title");
Object.defineProperty(exports, "EbaySectionTitleTitle", { enumerable: true, get: function () { return __importDefault(title_1).default; } });
var subtitle_1 = require("./subtitle");
Object.defineProperty(exports, "EbaySectionTitleSubtitle", { enumerable: true, get: function () { return __importDefault(subtitle_1).default; } });
var info_1 = require("./info");
Object.defineProperty(exports, "EbaySectionTitleInfo", { enumerable: true, get: function () { return __importDefault(info_1).default; } });
var overflow_1 = require("./overflow");
Object.defineProperty(exports, "EbaySectionTitleOverflow", { enumerable: true, get: function () { return __importDefault(overflow_1).default; } });
