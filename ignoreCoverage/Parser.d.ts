import { SoftwareProject } from "./SoftwareProject";
export declare class ParserOptions {
    includePosition: boolean;
    constructor(includePosition: boolean);
}
export declare class Parser {
    static parseSoftwareProject(softwareProject: SoftwareProject, options?: ParserOptions): void;
    private static parseFile;
    private static getFileExtension;
}
