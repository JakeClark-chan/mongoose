"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerInterfaceNegative = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('SomeInterface.java', `
public interface SomeInterface {
    public void notSmellyMethod(int interX, int interY, String interString);
}`);
const FileB = new ParsedTypes_1.MyFile('Class1.java', `
public class Class1 implements SomeInterface{

    public void notSmellyMethod(int interX, int interY, String interString) {

    }
}`);
const FileC = new ParsedTypes_1.MyFile('Class2.java', `
public class Class2 implements SomeInterface{

    public void notSmellyMethod(int interX, int interY, String interString) {

    }
}`);
exports.InnerInterfaceNegative = [FileA, FileB, FileC];
