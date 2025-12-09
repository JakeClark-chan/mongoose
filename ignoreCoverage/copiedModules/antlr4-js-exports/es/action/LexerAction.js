"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const HashCode_js_1 = __importDefault(require("../misc/HashCode.js"));
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
class LexerAction {
    constructor(action) {
        this.actionType = action;
        this.isPositionDependent = false;
    }
    hashCode() {
        const hash = new HashCode_js_1.default();
        this.updateHashCode(hash);
        return hash.finish();
    }
    updateHashCode(hash) {
        hash.update(this.actionType);
    }
    equals(other) {
        return this === other;
    }
}
exports.default = LexerAction;
