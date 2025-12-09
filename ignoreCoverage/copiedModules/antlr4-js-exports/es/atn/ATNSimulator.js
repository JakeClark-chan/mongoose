"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DFAState_js_1 = __importDefault(require("../dfa/DFAState.js"));
const ATNConfigSet_js_1 = __importDefault(require("./ATNConfigSet.js"));
const PredictionContextUtils_js_1 = require("../context/PredictionContextUtils.js");
const HashMap_js_1 = __importDefault(require("../misc/HashMap.js"));
class ATNSimulator {
    constructor(atn, sharedContextCache) {
        /**
         * The context cache maps all PredictionContext objects that are ==
         * to a single cached copy. This cache is shared across all contexts
         * in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
         * to use only cached nodes/graphs in addDFAState(). We don't want to
         * fill this during closure() since there are lots of contexts that
         * pop up but are not used ever again. It also greatly slows down closure().
         *
         * <p>This cache makes a huge difference in memory and a little bit in speed.
         * For the Java grammar on java.*, it dropped the memory requirements
         * at the end from 25M to 16M. We don't store any of the full context
         * graphs in the DFA because they are limited to local context only,
         * but apparently there's a lot of repetition there as well. We optimize
         * the config contexts before storing the config set in the DFA states
         * by literally rebuilding them with cached subgraphs only.</p>
         *
         * <p>I tried a cache for use during closure operations, that was
         * whacked after each adaptivePredict(). It cost a little bit
         * more time I think and doesn't save on the overall footprint
         * so it's not worth the complexity.</p>
         */
        this.atn = atn;
        this.sharedContextCache = sharedContextCache;
        return this;
    }
    getCachedContext(context) {
        if (this.sharedContextCache === null) {
            return context;
        }
        const visited = new HashMap_js_1.default();
        return (0, PredictionContextUtils_js_1.getCachedPredictionContext)(context, this.sharedContextCache, visited);
    }
}
exports.default = ATNSimulator;
// Must distinguish between missing edge and edge we know leads nowhere///
ATNSimulator.ERROR = new DFAState_js_1.default(0x7FFFFFFF, new ATNConfigSet_js_1.default());
