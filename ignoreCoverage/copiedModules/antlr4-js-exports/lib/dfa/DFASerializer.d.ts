export const __esModule: boolean;
export default DFASerializer;
/**
 * A DFA walker that knows how to dump them to serialized strings.
 */
declare class DFASerializer {
    constructor(dfa: any, literalNames: any, symbolicNames: any);
    dfa: any;
    literalNames: any;
    symbolicNames: any;
    toString(): string | null;
    getEdgeLabel(i: any): any;
    getStateString(s: any): string;
}
