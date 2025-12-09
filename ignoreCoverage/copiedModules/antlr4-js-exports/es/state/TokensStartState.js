"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const DecisionState_js_1 = __importDefault(require("./DecisionState.js"));
const ATNState_js_1 = __importDefault(require("./ATNState.js"));
/**
 * The Tokens rule start state linking to each lexer rule start state
 */
class TokensStartState extends DecisionState_js_1.default {
    constructor() {
        super();
        this.stateType = ATNState_js_1.default.TOKEN_START;
        return this;
    }
}
exports.default = TokensStartState;
