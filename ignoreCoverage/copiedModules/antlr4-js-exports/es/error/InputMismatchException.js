"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const RecognitionException_js_1 = __importDefault(require("./RecognitionException.js"));
/**
 * This signifies any kind of mismatched input exceptions such as
 * when the current input does not match the expected token.
 */
class InputMismatchException extends RecognitionException_js_1.default {
    constructor(recognizer) {
        super({
            message: "",
            recognizer: recognizer,
            input: recognizer.getInputStream(),
            ctx: recognizer._ctx
        });
        this.offendingToken = recognizer.getCurrentToken();
    }
}
exports.default = InputMismatchException;
