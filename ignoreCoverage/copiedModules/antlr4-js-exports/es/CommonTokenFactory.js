"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonToken_js_1 = __importDefault(require("./CommonToken.js"));
class TokenFactory {
}
/**
 * This default implementation of {@link TokenFactory} creates
 * {@link CommonToken} objects.
 */
class CommonTokenFactory extends TokenFactory {
    constructor(copyText) {
        super();
        /**
         * Indicates whether {@link CommonToken//setText} should be called after
         * constructing tokens to explicitly set the text. This is useful for cases
         * where the input stream might not be able to provide arbitrary substrings
         * of text from the input after the lexer creates a token (e.g. the
         * implementation of {@link CharStream//getText} in
         * {@link UnbufferedCharStream} throws an
         * {@link UnsupportedOperationException}). Explicitly setting the token text
         * allows {@link Token//getText} to be called at any time regardless of the
         * input stream implementation.
         *
         * <p>
         * The default value is {@code false} to avoid the performance and memory
         * overhead of copying text for every token unless explicitly requested.</p>
         */
        this.copyText = copyText === undefined ? false : copyText;
    }
    create(source, type, text, channel, start, stop, line, column) {
        const t = new CommonToken_js_1.default(source, type, channel, start, stop);
        t.line = line;
        t.column = column;
        if (text !== null) {
            t.text = text;
        }
        else if (this.copyText && source[1] !== null) {
            t.text = source[1].getText(start, stop);
        }
        return t;
    }
    createThin(type, text) {
        const t = new CommonToken_js_1.default(null, type);
        t.text = text;
        return t;
    }
}
exports.default = CommonTokenFactory;
/**
 * The default {@link CommonTokenFactory} instance.
 *
 * <p>
 * This token factory does not explicitly copy token text when constructing
 * tokens.</p>
 */
CommonTokenFactory.DEFAULT = new CommonTokenFactory();
