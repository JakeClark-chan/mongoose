"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const DecisionState_js_1 = __importDefault(require("../state/DecisionState.js"));
const ATNConfig_js_1 = __importDefault(require("./ATNConfig.js"));
class LexerATNConfig extends ATNConfig_js_1.default {
    constructor(params, config) {
        super(params, config);
        // This is the backing field for {@link //getLexerActionExecutor}.
        const lexerActionExecutor = params.lexerActionExecutor || null;
        this.lexerActionExecutor = lexerActionExecutor || (config !== null ? config.lexerActionExecutor : null);
        this.passedThroughNonGreedyDecision = config !== null ? this.checkNonGreedyDecision(config, this.state) : false;
        this.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
        this.equalsForConfigSet = LexerATNConfig.prototype.equals;
        return this;
    }
    updateHashCode(hash) {
        hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
    }
    equals(other) {
        return this === other || other instanceof LexerATNConfig && this.passedThroughNonGreedyDecision === other.passedThroughNonGreedyDecision && (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) && super.equals(other);
    }
    checkNonGreedyDecision(source, target) {
        return source.passedThroughNonGreedyDecision || target instanceof DecisionState_js_1.default && target.nonGreedy;
    }
}
exports.default = LexerATNConfig;
