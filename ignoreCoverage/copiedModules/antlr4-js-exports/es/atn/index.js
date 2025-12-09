"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ATN_js_1 = __importDefault(require("./ATN.js"));
const ATNDeserializer_js_1 = __importDefault(require("./ATNDeserializer.js"));
const LexerATNSimulator_js_1 = __importDefault(require("./LexerATNSimulator.js"));
const ParserATNSimulator_js_1 = __importDefault(require("./ParserATNSimulator.js"));
const PredictionMode_js_1 = __importDefault(require("./PredictionMode.js"));
const PredictionContextCache_js_1 = __importDefault(require("./PredictionContextCache.js"));
exports.default = {
    ATN: ATN_js_1.default,
    ATNDeserializer: ATNDeserializer_js_1.default,
    LexerATNSimulator: LexerATNSimulator_js_1.default,
    ParserATNSimulator: ParserATNSimulator_js_1.default,
    PredictionMode: PredictionMode_js_1.default,
    PredictionContextCache: PredictionContextCache_js_1.default
};
