"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const IntervalSet_js_1 = __importDefault(require("../misc/IntervalSet.js"));
const Transition_js_1 = __importDefault(require("./Transition.js"));
class AtomTransition extends Transition_js_1.default {
    constructor(target, label) {
        super(target);
        // The token type or character value; or, signifies special label.
        this.label_ = label;
        this.label = this.makeLabel();
        this.serializationType = Transition_js_1.default.ATOM;
    }
    makeLabel() {
        const s = new IntervalSet_js_1.default();
        s.addOne(this.label_);
        return s;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label_ === symbol;
    }
    toString() {
        return this.label_;
    }
}
exports.default = AtomTransition;
