export default class RuleTransition extends Transition {
    constructor(ruleStart: any, ruleIndex: any, precedence: any, followState: any);
    ruleIndex: any;
    precedence: any;
    followState: any;
    serializationType: number;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
import Transition from "./Transition.js";
