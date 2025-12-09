export default class PrecedencePredicate extends SemanticContext {
    constructor(precedence: any);
    precedence: any;
    evaluate(parser: any, outerContext: any): any;
    evalPrecedence(parser: any, outerContext: any): any;
    compareTo(other: any): number;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
}
import SemanticContext from "./SemanticContext.js";
