"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const DFASerializer_js_1 = __importDefault(require("./DFASerializer.js"));
class LexerDFASerializer extends DFASerializer_js_1.default {
    constructor(dfa) {
        super(dfa, null);
    }
    getEdgeLabel(i) {
        return "'" + String.fromCharCode(i) + "'";
    }
}
exports.default = LexerDFASerializer;
