"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareProject = void 0;
const Parser_1 = require("./Parser");
const ParsedTypes_1 = require("./ParsedTypes");
const Detector_1 = require("./Detector");
class SoftwareProject {
    constructor() {
        this.filesToParseDict = {};
        this.filesToParseDict = {};
    }
    addFileContent(path, fileContent) {
        let newFileToAdd = new ParsedTypes_1.MyFile(path, fileContent);
        return this.addFile(newFileToAdd);
    }
    addFile(file) {
        this.filesToParseDict[file.path] = file;
    }
    addFiles(files) {
        for (let file of files) {
            this.addFile(file);
        }
    }
    getFilePaths() {
        return Object.keys(this.getFilesDict());
    }
    getFile(path) {
        return this.filesToParseDict[path];
    }
    generateAstForFiles() {
        Parser_1.Parser.parseSoftwareProject(this, new Parser_1.ParserOptions(false));
    }
    getFilesDict() {
        return this.filesToParseDict;
    }
    detectDataClumps() {
        let detectorOptions = {};
        let detector = new Detector_1.Detector(detectorOptions);
        detector.detect(this);
    }
}
exports.SoftwareProject = SoftwareProject;
