export default class PrecedencePredicateTransition extends AbstractPredicateTransition {
    constructor(target: any, precedence: any);
    serializationType: number;
    precedence: any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    getPredicate(): PrecedencePredicate;
}
import AbstractPredicateTransition from "../atn/AbstractPredicateTransition.js";
import PrecedencePredicate from "../atn/PrecedencePredicate.js";
