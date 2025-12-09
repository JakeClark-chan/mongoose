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
class RangeTransition extends Transition_js_1.default {
    constructor(target, start, stop) {
        super(target);
        this.serializationType = Transition_js_1.default.RANGE;
        this.start = start;
        this.stop = stop;
        this.label = this.makeLabel();
    }
    makeLabel() {
        const s = new IntervalSet_js_1.default();
        s.addRange(this.start, this.stop);
        return s;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= this.start && symbol <= this.stop;
    }
    toString() {
        return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
    }
}
exports.default = RangeTransition;
