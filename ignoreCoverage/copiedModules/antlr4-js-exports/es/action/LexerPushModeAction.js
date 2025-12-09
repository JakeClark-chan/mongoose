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
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
class LexerPushModeAction extends LexerAction_js_1.default {
    constructor(mode) {
        super(LexerActionType_js_1.default.PUSH_MODE);
        this.mode = mode;
    }
    /**
     * <p>This action is implemented by calling {@link Lexer//pushMode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer) {
        lexer.pushMode(this.mode);
    }
    updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        else if (!(other instanceof LexerPushModeAction)) {
            return false;
        }
        else {
            return this.mode === other.mode;
        }
    }
    toString() {
        return "pushMode(" + this.mode + ")";
    }
}
exports.default = LexerPushModeAction;
