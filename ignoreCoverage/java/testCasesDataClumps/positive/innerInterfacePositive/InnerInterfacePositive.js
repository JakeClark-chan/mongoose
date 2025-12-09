"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerInterfacePositive = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('AnInterface.java', `
public interface AnInterface {
    public void notSmellyMethod(int interNX, int interNY, String interNString);
}`);
const FileB = new ParsedTypes_1.MyFile('Class1.java', `
public class Class1 implements AnInterface{
    public void aSmellyMethod1(int interX, int interY, String interString) {
    }
}`);
const FileC = new ParsedTypes_1.MyFile('Class2.java', `
public class Class2 implements AnInterface{
    public void aSmellyMethod2(int interX, int interY, String interString) {
    }
}`);
exports.InnerInterfacePositive = [FileA, FileB, FileC];
