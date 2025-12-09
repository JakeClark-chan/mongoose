"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const HashMap_js_1 = __importDefault(require("../misc/HashMap.js"));
class DoubleDict {
    constructor(defaultMapCtor) {
        this.defaultMapCtor = defaultMapCtor || HashMap_js_1.default;
        this.cacheMap = new this.defaultMapCtor();
    }
    get(a, b) {
        const d = this.cacheMap.get(a) || null;
        return d === null ? null : d.get(b) || null;
    }
    set(a, b, o) {
        let d = this.cacheMap.get(a) || null;
        if (d === null) {
            d = new this.defaultMapCtor();
            this.cacheMap.set(a, d);
        }
        d.set(b, o);
    }
}
exports.default = DoubleDict;
