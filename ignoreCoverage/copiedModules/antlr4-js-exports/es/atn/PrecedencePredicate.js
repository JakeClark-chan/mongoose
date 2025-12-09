"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const SemanticContext_js_1 = __importDefault(require("./SemanticContext.js"));
class PrecedencePredicate extends SemanticContext_js_1.default {
    constructor(precedence) {
        super();
        this.precedence = precedence === undefined ? 0 : precedence;
    }
    evaluate(parser, outerContext) {
        return parser.precpred(outerContext, this.precedence);
    }
    evalPrecedence(parser, outerContext) {
        if (parser.precpred(outerContext, this.precedence)) {
            return SemanticContext_js_1.default.NONE;
        }
        else {
            return null;
        }
    }
    compareTo(other) {
        return this.precedence - other.precedence;
    }
    updateHashCode(hash) {
        hash.update(this.precedence);
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        else if (!(other instanceof PrecedencePredicate)) {
            return false;
        }
        else {
            return this.precedence === other.precedence;
        }
    }
    toString() {
        return "{" + this.precedence + ">=prec}?";
    }
}
exports.default = PrecedencePredicate;
// HORRIBLE workaround circular import, avoiding dynamic import
SemanticContext_js_1.default.PrecedencePredicate = PrecedencePredicate;
