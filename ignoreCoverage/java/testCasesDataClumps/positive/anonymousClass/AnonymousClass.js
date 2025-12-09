"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousClass = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('NormalClass.java', `
public class NormalClass {
    public void method1() {
    }
}`);
const FileB = new ParsedTypes_1.MyFile('AnotherNormalClass.java', `
public class AnotherNormalClass {
    public void method2(int an1, int an2, int an3) {
    }
}`);
const FileC = new ParsedTypes_1.MyFile('Anonymous.java', `
public class Anonymous {
    public void normalMethod(){
        NormalClass n = new NormalClass(){
            public void smellyMethod( int an2, int an1, int an3) {

            }
        }
    }
}`);
exports.AnonymousClass = [FileA, FileB, FileC];
