"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.ParserOptions = void 0;
const JavaParserAntlr4_1 = require("./java/parser/JavaParserAntlr4");
class ParserOptions {
    constructor(includePosition) {
        this.includePosition = includePosition;
    }
}
exports.ParserOptions = ParserOptions;
class Parser {
    static parseSoftwareProject(softwareProject, options) {
        let parserOptions = options || new ParserOptions(false);
        let filePaths = softwareProject.getFilePaths();
        for (let filePath of filePaths) {
            let file = softwareProject.getFile(filePath);
            let parsedFile = Parser.parseFile(file, parserOptions);
            if (parsedFile) {
                file.ast = parsedFile;
            }
        }
    }
    static parseFile(file, options) {
        let filePath = file.path;
        let fileExtension = Parser.getFileExtension(filePath);
        switch (fileExtension) {
            // TODO own parser for each language as plugin
            case 'java':
                try {
                    let result = JavaParserAntlr4_1.JavaParserAntlr4.parse(file, options.includePosition);
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
                break;
            default:
                console.log('File extension not supported: ' + fileExtension);
                break;
        }
        return null;
    }
    static getFileExtension(filePath) {
        if (!filePath)
            return null;
        if (filePath.indexOf('.') === -1)
            return null;
        let fileExtension = filePath.split('.').pop();
        return fileExtension;
    }
}
exports.Parser = Parser;
