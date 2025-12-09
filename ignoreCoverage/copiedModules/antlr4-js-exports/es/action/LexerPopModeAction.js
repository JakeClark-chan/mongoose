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
 * Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
 *
 * <p>The {@code popMode} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
class LexerPopModeAction extends LexerAction_js_1.default {
    constructor() {
        super(LexerActionType_js_1.default.POP_MODE);
    }
    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer) {
        lexer.popMode();
    }
    toString() {
        return "popMode";
    }
}
exports.default = LexerPopModeAction;
LexerPopModeAction.INSTANCE = new LexerPopModeAction();
