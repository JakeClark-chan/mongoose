"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleClassesInOneFile = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileB = new ParsedTypes_1.MyFile('MultipleClassesInOneFile.java', `
public class Fields2 {
    String foo = "name";
}

public class OtherFields2 {
    String foo = "name";
}
`);
exports.MultipleClassesInOneFile = [FileB];
