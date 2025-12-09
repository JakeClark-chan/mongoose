"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharStream_js_1 = __importDefault(require("./CharStream.js"));
/**
 * @deprecated Use CharStream instead
*/
class InputStream extends CharStream_js_1.default {
    constructor(data, decodeToUnicodeCodePoints) {
        super(data, decodeToUnicodeCodePoints);
    }
}
exports.default = InputStream;
