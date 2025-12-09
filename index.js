"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCasesJava = exports.ParsedTypes = exports.SoftwareProject = exports.antlr4 = void 0;
/* istanbul ignore file */
const MyAntlr4_1 = require("./ignoreCoverage/util/MyAntlr4");
Object.defineProperty(exports, "antlr4", { enumerable: true, get: function () { return MyAntlr4_1.antlr4; } });
const SoftwareProject_1 = require("./ignoreCoverage/SoftwareProject");
Object.defineProperty(exports, "SoftwareProject", { enumerable: true, get: function () { return SoftwareProject_1.SoftwareProject; } });
const ParsedTypes = __importStar(require("./ignoreCoverage/ParsedTypes"));
exports.ParsedTypes = ParsedTypes;
const java_1 = require("./ignoreCoverage/java/");
Object.defineProperty(exports, "TestCasesJava", { enumerable: true, get: function () { return java_1.TestCasesJava; } });
