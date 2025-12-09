"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EbayNoticeContent = exports.EbayInlineNotice = void 0;
var inline_notice_1 = require("./inline-notice");
Object.defineProperty(exports, "EbayInlineNotice", { enumerable: true, get: function () { return __importDefault(inline_notice_1).default; } });
var ebay_notice_content_1 = require("../ebay-notice-base/components/ebay-notice-content");
Object.defineProperty(exports, "EbayNoticeContent", { enumerable: true, get: function () { return ebay_notice_content_1.EbayNoticeContent; } });
