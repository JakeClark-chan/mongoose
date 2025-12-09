export const __esModule: boolean;
export default FileStream;
declare const FileStream_base: any;
/**
 * This is an InputStream that is loaded from a file all at once
 * when you construct the object.
 */
declare class FileStream extends FileStream_base {
    [x: string]: any;
    static fromPath(path: any, encoding: any, callback: any): void;
    constructor(fileName: any, encoding: any, decodeToUnicodeCodePoints: any);
    fileName: any;
}
