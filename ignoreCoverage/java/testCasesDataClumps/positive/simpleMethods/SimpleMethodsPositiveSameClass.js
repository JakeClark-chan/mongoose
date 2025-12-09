"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMethodsPositiveSameClass = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('SameClass.java', `
public class SameClass {
    public void someSmellyMethod1(int paX, int paY, String paString) {
    }

    public void anotherSmelly(int paX, int paY, String paString) {
    }
}`);
exports.SimpleMethodsPositiveSameClass = [FileA];
