"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const Predicate_js_1 = __importDefault(require("../atn/Predicate.js"));
const Transition_js_1 = __importDefault(require("./Transition.js"));
const AbstractPredicateTransition_js_1 = __importDefault(require("../atn/AbstractPredicateTransition.js"));
class PredicateTransition extends AbstractPredicateTransition_js_1.default {
    constructor(target, ruleIndex, predIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition_js_1.default.PREDICATE;
        this.ruleIndex = ruleIndex;
        this.predIndex = predIndex;
        this.isCtxDependent = isCtxDependent; // e.g., $i ref in pred
        this.isEpsilon = true;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }
    getPredicate() {
        return new Predicate_js_1.default(this.ruleIndex, this.predIndex, this.isCtxDependent);
    }
    toString() {
        return "pred_" + this.ruleIndex + ":" + this.predIndex;
    }
}
exports.default = PredicateTransition;
