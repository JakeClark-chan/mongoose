"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const java_1 = require("./java");
const SoftwareProject_1 = require("./SoftwareProject");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Development started");
        console.log("Creating software project");
        let softwareProject = new SoftwareProject_1.SoftwareProject();
        console.log("Adding files to software project");
        softwareProject.addFiles(java_1.TestCasesJava.Positives.SimpleMethodsWithDataClumps);
        //    softwareProject.addFiles(TestCasesJava.Negatives.SimpleMethodsWithoutDataClumps);
        console.log("Parsing files to AST");
        softwareProject.generateAstForFiles();
        console.log("Getting parsed AST");
        let filePaths = softwareProject.getFilePaths();
        for (let filePath of filePaths) {
            let file = softwareProject.getFile(filePath);
            console.log("File: " + filePath);
            console.log("AST: " + JSON.stringify(file.ast, null, 2));
        }
        console.log("Detecting data clumps");
        softwareProject.detectDataClumps();
    });
}
main();
