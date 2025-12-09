"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const PredicateTransition_js_1 = __importDefault(require("../transition/PredicateTransition.js"));
const RecognitionException_js_1 = __importDefault(require("./RecognitionException.js"));
/**
 * A semantic predicate failed during validation. Validation of predicates
 * occurs when normally parsing the alternative just like matching a token.
 * Disambiguating predicate evaluation occurs when we test a predicate during
 * prediction.
 */
class FailedPredicateException extends RecognitionException_js_1.default {
    constructor(recognizer, predicate, message) {
        super({
            message: formatMessage(predicate, message || null),
            recognizer: recognizer,
            input: recognizer.getInputStream(),
            ctx: recognizer._ctx
        });
        const s = recognizer._interp.atn.states[recognizer.state];
        const trans = s.transitions[0];
        if (trans instanceof PredicateTransition_js_1.default) {
            this.ruleIndex = trans.ruleIndex;
            this.predicateIndex = trans.predIndex;
        }
        else {
            this.ruleIndex = 0;
            this.predicateIndex = 0;
        }
        this.predicate = predicate;
        this.offendingToken = recognizer.getCurrentToken();
    }
}
exports.default = FailedPredicateException;
function formatMessage(predicate, message) {
    if (message !== null) {
        return message;
    }
    else {
        return "failed predicate: {" + predicate + "}?";
    }
}
