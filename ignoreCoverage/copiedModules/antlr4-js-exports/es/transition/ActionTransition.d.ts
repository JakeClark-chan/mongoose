export default class ActionTransition extends Transition {
    constructor(target: any, ruleIndex: any, actionIndex: any, isCtxDependent: any);
    serializationType: number;
    ruleIndex: any;
    actionIndex: any;
    isCtxDependent: any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
import Transition from "./Transition.js";
