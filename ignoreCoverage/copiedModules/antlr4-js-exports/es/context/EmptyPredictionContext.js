"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const PredictionContext_js_1 = __importDefault(require("./PredictionContext.js"));
const SingletonPredictionContext_js_1 = __importDefault(require("./SingletonPredictionContext.js"));
class EmptyPredictionContext extends SingletonPredictionContext_js_1.default {
    constructor() {
        super(null, PredictionContext_js_1.default.EMPTY_RETURN_STATE);
    }
    isEmpty() {
        return true;
    }
    getParent(index) {
        return null;
    }
    getReturnState(index) {
        return this.returnState;
    }
    equals(other) {
        return this === other;
    }
    toString() {
        return "$";
    }
}
exports.default = EmptyPredictionContext;
PredictionContext_js_1.default.EMPTY = new EmptyPredictionContext();
