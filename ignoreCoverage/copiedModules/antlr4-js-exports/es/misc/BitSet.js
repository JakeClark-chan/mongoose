"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const HashCode_js_1 = __importDefault(require("./HashCode.js"));
const equalArrays_js_1 = __importDefault(require("../utils/equalArrays.js"));
class BitSet {
    constructor() {
        this.data = [];
    }
    add(value) {
        this.data[value] = true;
    }
    or(set) {
        Object.keys(set.data).map(alt => this.add(alt), this);
    }
    remove(value) {
        delete this.data[value];
    }
    has(value) {
        return this.data[value] === true;
    }
    values() {
        return Object.keys(this.data);
    }
    minValue() {
        return Math.min.apply(null, this.values());
    }
    hashCode() {
        return HashCode_js_1.default.hashStuff(this.values());
    }
    equals(other) {
        return other instanceof BitSet && (0, equalArrays_js_1.default)(this.data, other.data);
    }
    toString() {
        return "{" + this.values().join(", ") + "}";
    }
    get length() {
        return this.values().length;
    }
}
exports.default = BitSet;
