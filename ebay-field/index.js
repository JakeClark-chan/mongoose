"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbayFieldDescription = exports.EbayLabel = exports.EbayField = void 0;
var field_1 = require("./field");
Object.defineProperty(exports, "EbayField", { enumerable: true, get: function () { return __importDefault(field_1).default; } });
var label_1 = require("./label");
Object.defineProperty(exports, "EbayLabel", { enumerable: true, get: function () { return __importDefault(label_1).default; } });
var description_1 = require("./description");
Object.defineProperty(exports, "EbayFieldDescription", { enumerable: true, get: function () { return __importDefault(description_1).default; } });
