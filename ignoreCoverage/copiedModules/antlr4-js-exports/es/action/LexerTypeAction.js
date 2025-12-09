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
 * Implements the {@code type} lexer action by calling {@link Lexer//setType}
 * with the assigned type
 */
class LexerTypeAction extends LexerAction_js_1.default {
    constructor(type) {
        super(LexerActionType_js_1.default.TYPE);
        this.type = type;
    }
    execute(lexer) {
        lexer.type = this.type;
    }
    updateHashCode(hash) {
        hash.update(this.actionType, this.type);
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        else if (!(other instanceof LexerTypeAction)) {
            return false;
        }
        else {
            return this.type === other.type;
        }
    }
    toString() {
        return "type(" + this.type + ")";
    }
}
exports.default = LexerTypeAction;
