"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const Transition_js_1 = __importDefault(require("./Transition.js"));
const SetTransition_js_1 = __importDefault(require("./SetTransition.js"));
class NotSetTransition extends SetTransition_js_1.default {
    constructor(target, set) {
        super(target, set);
        this.serializationType = Transition_js_1.default.NOT_SET;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= minVocabSymbol && symbol <= maxVocabSymbol && !super.matches(symbol, minVocabSymbol, maxVocabSymbol);
    }
    toString() {
        return '~' + super.toString();
    }
}
exports.default = NotSetTransition;
