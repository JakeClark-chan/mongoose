export const __esModule: boolean;
export default EpsilonTransition;
declare const EpsilonTransition_base: any;
declare class EpsilonTransition extends EpsilonTransition_base {
    [x: string]: any;
    constructor(target: any, outermostPrecedenceReturn: any);
    serializationType: any;
    isEpsilon: boolean;
    outermostPrecedenceReturn: any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    toString(): string;
}
