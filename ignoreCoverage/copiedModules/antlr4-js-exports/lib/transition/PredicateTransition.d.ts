export const __esModule: boolean;
export default PredicateTransition;
declare const PredicateTransition_base: any;
declare class PredicateTransition extends PredicateTransition_base {
    [x: string]: any;
    constructor(target: any, ruleIndex: any, predIndex: any, isCtxDependent: any);
    serializationType: any;
    ruleIndex: any;
    predIndex: any;
    isCtxDependent: any;
    isEpsilon: boolean;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    getPredicate(): any;
    toString(): string;
}
