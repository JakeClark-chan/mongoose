export default class Predicate extends SemanticContext {
    constructor(ruleIndex: any, predIndex: any, isCtxDependent: any);
    ruleIndex: any;
    predIndex: any;
    isCtxDependent: any;
    evaluate(parser: any, outerContext: any): any;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
}
import SemanticContext from "./SemanticContext.js";
