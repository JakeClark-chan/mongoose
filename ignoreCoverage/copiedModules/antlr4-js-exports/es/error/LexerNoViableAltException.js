"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const Interval_js_1 = __importDefault(require("../misc/Interval.js"));
const RecognitionException_js_1 = __importDefault(require("./RecognitionException.js"));
class LexerNoViableAltException extends RecognitionException_js_1.default {
    constructor(lexer, input, startIndex, deadEndConfigs) {
        super({
            message: "",
            recognizer: lexer,
            input: input,
            ctx: null
        });
        this.startIndex = startIndex;
        this.deadEndConfigs = deadEndConfigs;
    }
    toString() {
        let symbol = "";
        if (this.startIndex >= 0 && this.startIndex < this.input.size) {
            symbol = this.input.getText(new Interval_js_1.default(this.startIndex, this.startIndex));
        }
        return "LexerNoViableAltException" + symbol;
    }
}
exports.default = LexerNoViableAltException;
