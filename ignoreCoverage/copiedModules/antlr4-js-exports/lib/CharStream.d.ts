export const __esModule: boolean;
export default CharStream;
/**
 * If decodeToUnicodeCodePoints is true, the input is treated
 * as a series of Unicode code points.
 *
 * Otherwise, the input is treated as a series of 16-bit UTF-16 code
 * units.
 */
declare class CharStream {
    constructor(data: any, decodeToUnicodeCodePoints: any);
    name: string;
    strdata: any;
    decodeToUnicodeCodePoints: any;
    _index: number;
    data: any[];
    _size: number;
    /**
     * Reset the stream so that it's in the same state it was
     * when the object was created *except* the data array is not
     * touched.
     */
    reset(): void;
    consume(): void;
    LA(offset: any): any;
    LT(offset: any): any;
    mark(): number;
    release(marker: any): void;
    /**
     * consume() ahead until p==_index; can't just set p=_index as we must
     * update line and column. If we seek backwards, just set p
     */
    seek(_index: any): void;
    getText(start: any, stop: any): any;
    toString(): any;
    get index(): number;
    get size(): number;
}
