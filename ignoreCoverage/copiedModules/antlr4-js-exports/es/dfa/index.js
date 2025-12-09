"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DFA_js_1 = __importDefault(require("./DFA.js"));
const DFASerializer_js_1 = __importDefault(require("./DFASerializer.js"));
const LexerDFASerializer_js_1 = __importDefault(require("./LexerDFASerializer.js"));
const PredPrediction_js_1 = __importDefault(require("./PredPrediction.js"));
exports.default = {
    DFA: DFA_js_1.default,
    DFASerializer: DFASerializer_js_1.default,
    LexerDFASerializer: LexerDFASerializer_js_1.default,
    PredPrediction: PredPrediction_js_1.default
};
