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
 * Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
 * the assigned mode
 */
class LexerModeAction extends LexerAction_js_1.default {
    constructor(mode) {
        super(LexerActionType_js_1.default.MODE);
        this.mode = mode;
    }
    /**
     * <p>This action is implemented by calling {@link Lexer//mode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer) {
        lexer.mode(this.mode);
    }
    updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        else if (!(other instanceof LexerModeAction)) {
            return false;
        }
        else {
            return this.mode === other.mode;
        }
    }
    toString() {
        return "mode(" + this.mode + ")";
    }
}
exports.default = LexerModeAction;
