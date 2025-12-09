"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMethodsWithDataClumps = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('Fields1.java', `
public class Fields1 {
    public void normalMethod(int foo, boolean bar, String baz){}
}`);
const FileB = new ParsedTypes_1.MyFile('Fields2.java', `
public class Fields2 {
    public void normalOtherMethod(int foo, boolean bar, String baz){}
}
`);
exports.SimpleMethodsWithDataClumps = [FileA, FileB];
