"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const ATNConfigSet_js_1 = __importDefault(require("./ATNConfigSet.js"));
const HashSet_js_1 = __importDefault(require("../misc/HashSet.js"));
class OrderedATNConfigSet extends ATNConfigSet_js_1.default {
    constructor() {
        super();
        this.configLookup = new HashSet_js_1.default();
    }
}
exports.default = OrderedATNConfigSet;
