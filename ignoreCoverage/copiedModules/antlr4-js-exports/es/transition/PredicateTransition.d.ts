export default class PredicateTransition extends AbstractPredicateTransition {
    constructor(target: any, ruleIndex: any, predIndex: any, isCtxDependent: any);
    serializationType: number;
    ruleIndex: any;
    predIndex: any;
    isCtxDependent: any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    getPredicate(): Predicate;
}
import AbstractPredicateTransition from "../atn/AbstractPredicateTransition.js";
import Predicate from "../atn/Predicate.js";
