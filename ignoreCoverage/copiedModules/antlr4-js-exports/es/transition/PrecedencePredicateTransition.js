"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const PrecedencePredicate_js_1 = __importDefault(require("../atn/PrecedencePredicate.js"));
const Transition_js_1 = __importDefault(require("./Transition.js"));
const AbstractPredicateTransition_js_1 = __importDefault(require("../atn/AbstractPredicateTransition.js"));
class PrecedencePredicateTransition extends AbstractPredicateTransition_js_1.default {
    constructor(target, precedence) {
        super(target);
        this.serializationType = Transition_js_1.default.PRECEDENCE;
        this.precedence = precedence;
        this.isEpsilon = true;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }
    getPredicate() {
        return new PrecedencePredicate_js_1.default(this.precedence);
    }
    toString() {
        return this.precedence + " >= _p";
    }
}
exports.default = PrecedencePredicateTransition;
