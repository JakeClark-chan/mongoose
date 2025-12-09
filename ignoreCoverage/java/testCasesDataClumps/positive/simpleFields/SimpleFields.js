"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFields = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('Fields1.java', `
public class Fields1 {
    int fieldsX = 10;
    int fieldsY;
    String fieldsString;
}`);
const FileB = new ParsedTypes_1.MyFile('Fields2.java', `
public class Fields2 {
    String fieldsString = "name";
    int fieldsX = 10;
    int fieldsY;
}
`);
exports.SimpleFields = [FileA, FileB];
