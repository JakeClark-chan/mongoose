/**
 * A DFA walker that knows how to dump them to serialized strings.
 */
export default class DFASerializer {
    constructor(dfa: any, literalNames: any, symbolicNames: any);
    dfa: any;
    literalNames: any;
    symbolicNames: any;
    toString(): string | null;
    getEdgeLabel(i: any): any;
    getStateString(s: any): string;
}
