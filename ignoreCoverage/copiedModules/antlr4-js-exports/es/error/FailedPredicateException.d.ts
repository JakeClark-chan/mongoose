/**
 * A semantic predicate failed during validation. Validation of predicates
 * occurs when normally parsing the alternative just like matching a token.
 * Disambiguating predicate evaluation occurs when we test a predicate during
 * prediction.
 */
export default class FailedPredicateException extends RecognitionException {
    constructor(recognizer: any, predicate: any, message: any);
    ruleIndex: any;
    predicateIndex: any;
    predicate: any;
}
import RecognitionException from "./RecognitionException.js";
