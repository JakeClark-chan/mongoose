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
class ActionTransition extends Transition_js_1.default {
    constructor(target, ruleIndex, actionIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition_js_1.default.ACTION;
        this.ruleIndex = ruleIndex;
        this.actionIndex = actionIndex === undefined ? -1 : actionIndex;
        this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred
        this.isEpsilon = true;
    }
    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }
    toString() {
        return "action_" + this.ruleIndex + ":" + this.actionIndex;
    }
}
exports.default = ActionTransition;
