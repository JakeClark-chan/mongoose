"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const LexerActionType_js_1 = __importDefault(require("../atn/LexerActionType.js"));
const LexerAction_js_1 = __importDefault(require("./LexerAction.js"));
/**
 * Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
 *
 * <p>The {@code skip} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
class LexerSkipAction extends LexerAction_js_1.default {
    constructor() {
        super(LexerActionType_js_1.default.SKIP);
    }
    execute(lexer) {
        lexer.skip();
    }
    toString() {
        return "skip";
    }
}
exports.default = LexerSkipAction;
// Provides a singleton instance of this parameterless lexer action.
LexerSkipAction.INSTANCE = new LexerSkipAction();
