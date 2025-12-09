"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const BlockStartState_js_1 = __importDefault(require("./BlockStartState.js"));
const ATNState_js_1 = __importDefault(require("./ATNState.js"));
/**
 * Start of {@code (A|B|...)+} loop. Technically a decision state, but
 * we don't use for code generation; somebody might need it, so I'm defining
 * it for completeness. In reality, the {@link PlusLoopbackState} node is the
 * real decision-making note for {@code A+}
 */
class PlusBlockStartState extends BlockStartState_js_1.default {
    constructor() {
        super();
        this.stateType = ATNState_js_1.default.PLUS_BLOCK_START;
        this.loopBackState = null;
        return this;
    }
}
exports.default = PlusBlockStartState;
