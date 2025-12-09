"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFields = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('Fields1.java', `
public class Fields1 {
    int foo = 10;
    int bar;
    String baz;

    public void normalMethod(){
        int temp = fieldsX + 20 ;
        fieldsY = 10 * fieldsX;
        fieldsString = "new string";
    }
}`);
const FileB = new ParsedTypes_1.MyFile('Fields2.java', `
public class Fields2 {
    String foo = "name";
    int bar = 10;
    int notBaz;

    public void normalMethod(){
        fieldsX  =  100 ;
        fieldsY = 50;
        fieldsString = Integer.toString(fieldsX);
    }
}
`);
exports.SimpleFields = [FileA, FileB];
