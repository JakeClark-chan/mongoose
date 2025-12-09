declare namespace _default {
    function fromString(str: any): CharStream;
    function fromBlob(blob: any, encoding: any, onLoad: any, onError: any): void;
    function fromBuffer(buffer: any, encoding: any): CharStream;
    function fromPath(path: any, encoding: any, callback: any): void;
    function fromPathSync(path: any, encoding: any): FileStream;
}
export default _default;
import CharStream from "./CharStream.js";
import FileStream from "./FileStream.js";
