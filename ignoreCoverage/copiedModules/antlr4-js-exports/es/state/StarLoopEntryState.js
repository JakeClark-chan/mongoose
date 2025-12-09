"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const DecisionState_js_1 = __importDefault(require("./DecisionState.js"));
const ATNState_js_1 = __importDefault(require("./ATNState.js"));
class StarLoopEntryState extends DecisionState_js_1.default {
    constructor() {
        super();
        this.stateType = ATNState_js_1.default.STAR_LOOP_ENTRY;
        this.loopBackState = null;
        // Indicates whether this state can benefit from a precedence DFA during SLL decision making.
        this.isPrecedenceDecision = null;
        return this;
    }
}
exports.default = StarLoopEntryState;
