export const __esModule: boolean;
export default PrecedencePredicateTransition;
declare const PrecedencePredicateTransition_base: any;
declare class PrecedencePredicateTransition extends PrecedencePredicateTransition_base {
    [x: string]: any;
    constructor(target: any, precedence: any);
    serializationType: any;
    precedence: any;
    isEpsilon: boolean;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    getPredicate(): any;
    toString(): string;
}
