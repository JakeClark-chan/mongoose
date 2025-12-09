export const __esModule: boolean;
export default Predicate;
declare const Predicate_base: any;
declare class Predicate extends Predicate_base {
    [x: string]: any;
    constructor(ruleIndex: any, predIndex: any, isCtxDependent: any);
    ruleIndex: any;
    predIndex: any;
    isCtxDependent: any;
    evaluate(parser: any, outerContext: any): any;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
