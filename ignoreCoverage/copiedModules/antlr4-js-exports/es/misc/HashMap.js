"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const standardEqualsFunction_js_1 = __importDefault(require("../utils/standardEqualsFunction.js"));
const standardHashCodeFunction_js_1 = __importDefault(require("../utils/standardHashCodeFunction.js"));
const HASH_KEY_PREFIX = "h-";
class HashMap {
    constructor(hashFunction, equalsFunction) {
        this.data = {};
        this.hashFunction = hashFunction || standardHashCodeFunction_js_1.default;
        this.equalsFunction = equalsFunction || standardEqualsFunction_js_1.default;
    }
    set(key, value) {
        const hashKey = HASH_KEY_PREFIX + this.hashFunction(key);
        if (hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key)) {
                    const oldValue = entry.value;
                    entry.value = value;
                    return oldValue;
                }
            }
            entries.push({
                key: key,
                value: value
            });
            return value;
        }
        else {
            this.data[hashKey] = [{
                    key: key,
                    value: value
                }];
            return value;
        }
    }
    containsKey(key) {
        const hashKey = HASH_KEY_PREFIX + this.hashFunction(key);
        if (hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key))
                    return true;
            }
        }
        return false;
    }
    get(key) {
        const hashKey = HASH_KEY_PREFIX + this.hashFunction(key);
        if (hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key))
                    return entry.value;
            }
        }
        return null;
    }
    entries() {
        return Object.keys(this.data).filter(key => key.startsWith(HASH_KEY_PREFIX)).flatMap(key => this.data[key], this);
    }
    getKeys() {
        return this.entries().map(e => e.key);
    }
    getValues() {
        return this.entries().map(e => e.value);
    }
    toString() {
        const ss = this.entries().map(e => '{' + e.key + ':' + e.value + '}');
        return '[' + ss.join(", ") + ']';
    }
    get length() {
        return Object.keys(this.data).filter(key => key.startsWith(HASH_KEY_PREFIX)).map(key => this.data[key].length, this).reduce((accum, item) => accum + item, 0);
    }
}
exports.default = HashMap;
