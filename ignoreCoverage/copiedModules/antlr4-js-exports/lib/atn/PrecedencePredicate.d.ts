export const __esModule: boolean;
export default PrecedencePredicate;
declare const PrecedencePredicate_base: any;
declare class PrecedencePredicate extends PrecedencePredicate_base {
    [x: string]: any;
    constructor(precedence: any);
    precedence: any;
    evaluate(parser: any, outerContext: any): any;
    evalPrecedence(parser: any, outerContext: any): any;
    compareTo(other: any): number;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
