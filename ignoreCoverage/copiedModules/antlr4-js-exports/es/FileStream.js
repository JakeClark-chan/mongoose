"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputStream_js_1 = __importDefault(require("./InputStream.js"));
const CharStream_js_1 = __importDefault(require("./CharStream.js"));
const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const fs_1 = __importDefault(require("fs"));
/**
 * This is an InputStream that is loaded from a file all at once
 * when you construct the object.
 */
class FileStream extends InputStream_js_1.default {
    static fromPath(path, encoding, callback) {
        if (!isNode)
            throw new Error("FileStream is only available when running in Node!");
        fs_1.default.readFile(path, encoding, function (err, data) {
            let is = null;
            if (data !== null) {
                is = new CharStream_js_1.default(data, true);
            }
            callback(err, is);
        });
    }
    constructor(fileName, encoding, decodeToUnicodeCodePoints) {
        if (!isNode)
            throw new Error("FileStream is only available when running in Node!");
        const data = fs_1.default.readFileSync(fileName, encoding || "utf-8");
        super(data, decodeToUnicodeCodePoints);
        this.fileName = fileName;
    }
}
exports.default = FileStream;
