"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
/**
 * Represents a token that was consumed during resynchronization
 * rather than during a valid match operation. For example,
 * we will create this kind of a node during single token insertion
 * and deletion as well as during "consume until error recovery set"
 * upon no viable alternative exceptions.
 */
const TerminalNodeImpl_js_1 = __importDefault(require("./TerminalNodeImpl.js"));
class ErrorNodeImpl extends TerminalNodeImpl_js_1.default {
    constructor(token) {
        super(token);
    }
    isErrorNode() {
        return true;
    }
    accept(visitor) {
        return visitor.visitErrorNode(this);
    }
}
exports.default = ErrorNodeImpl;
