export const __esModule: boolean;
export default RuleTransition;
declare const RuleTransition_base: any;
declare class RuleTransition extends RuleTransition_base {
    [x: string]: any;
    constructor(ruleStart: any, ruleIndex: any, precedence: any, followState: any);
    ruleIndex: any;
    precedence: any;
    followState: any;
    serializationType: any;
    isEpsilon: boolean;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
