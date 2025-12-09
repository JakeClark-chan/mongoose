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
const Token_js_1 = __importDefault(require("../Token.js"));
const TerminalNode_js_1 = __importDefault(require("./TerminalNode.js"));
class TerminalNodeImpl extends TerminalNode_js_1.default {
    constructor(symbol) {
        super();
        this.parentCtx = null;
        this.symbol = symbol;
    }
    getChild(i) {
        return null;
    }
    getSymbol() {
        return this.symbol;
    }
    getParent() {
        return this.parentCtx;
    }
    getPayload() {
        return this.symbol;
    }
    getSourceInterval() {
        if (this.symbol === null) {
            return Interval_js_1.default.INVALID_INTERVAL;
        }
        const tokenIndex = this.symbol.tokenIndex;
        return new Interval_js_1.default(tokenIndex, tokenIndex);
    }
    getChildCount() {
        return 0;
    }
    accept(visitor) {
        return visitor.visitTerminal(this);
    }
    getText() {
        return this.symbol.text;
    }
    toString() {
        if (this.symbol.type === Token_js_1.default.EOF) {
            return "<EOF>";
        }
        else {
            return this.symbol.text;
        }
    }
}
exports.default = TerminalNodeImpl;
