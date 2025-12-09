"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polymorphism = void 0;
const ParsedTypes_1 = require("../../../../ParsedTypes");
const FileA = new ParsedTypes_1.MyFile('Polymorphism.java', `
public class Polymorphism {

    public void smellyParent(int dup1, int dup2, int dup3) {

    }
}`);
const FileB = new ParsedTypes_1.MyFile('Child.java', `
public class Child extends Polymorphism {

    public void smellyChild(int dup2, int dup1, int dup3) {

    }
}`);
exports.Polymorphism = [FileA, FileB];
