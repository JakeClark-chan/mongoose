export const __esModule: boolean;
export default FailedPredicateException;
declare const FailedPredicateException_base: any;
/**
 * A semantic predicate failed during validation. Validation of predicates
 * occurs when normally parsing the alternative just like matching a token.
 * Disambiguating predicate evaluation occurs when we test a predicate during
 * prediction.
 */
declare class FailedPredicateException extends FailedPredicateException_base {
    [x: string]: any;
    constructor(recognizer: any, predicate: any, message: any);
    ruleIndex: any;
    predicateIndex: any;
    predicate: any;
    offendingToken: any;
}
