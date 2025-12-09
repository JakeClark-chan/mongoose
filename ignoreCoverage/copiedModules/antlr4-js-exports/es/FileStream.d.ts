/**
 * This is an InputStream that is loaded from a file all at once
 * when you construct the object.
 */
export default class FileStream extends InputStream {
    static fromPath(path: any, encoding: any, callback: any): void;
    constructor(fileName: any, encoding: any, decodeToUnicodeCodePoints: any);
    fileName: any;
}
import InputStream from "./InputStream.js";
