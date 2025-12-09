import { MyFile } from "./ParsedTypes";
export declare class SoftwareProject {
    filesToParseDict: {
        [key: string]: MyFile;
    };
    constructor();
    addFileContent(path: string, fileContent: string): void;
    addFile(file: MyFile): void;
    addFiles(files: MyFile[]): void;
    getFilePaths(): string[];
    getFile(path: string): MyFile;
    generateAstForFiles(): void;
    getFilesDict(): {
        [key: string]: MyFile;
    };
    detectDataClumps(): void;
}
