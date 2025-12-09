export const __esModule: boolean;
export default RangeTransition;
declare const RangeTransition_base: any;
declare class RangeTransition extends RangeTransition_base {
    [x: string]: any;
    constructor(target: any, start: any, stop: any);
    serializationType: any;
    start: any;
    stop: any;
    label: any;
    makeLabel(): any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    toString(): string;
}
