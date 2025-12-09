"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
// A transition containing a set of values.
const IntervalSet_js_1 = __importDefault(require("../misc/IntervalSet.js"));
const Token_js_1 = __importDefault(require("../Token.js"));
const Transition_js_1 = __importDefault(require("./Transition.js"));
class SetTransition extends Transition_js_1.default {
    constructor(target, set) {
        super(target);
        this.serializationType = Transition_js_1.default.SET;
        if (set !== undefined && set !== null) {
            this.label = set;
        }
        else {
            this.label = new IntervalSet_js_1.default();
            this.label.addOne(Token_js_1.default.INVALID_TYPE);
        }
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label.contains(symbol);
    }
    toString() {
        return this.label.toString();
    }
}
exports.default = SetTransition;
