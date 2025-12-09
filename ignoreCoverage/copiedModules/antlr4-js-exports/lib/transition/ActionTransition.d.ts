export const __esModule: boolean;
export default ActionTransition;
declare const ActionTransition_base: any;
declare class ActionTransition extends ActionTransition_base {
    [x: string]: any;
    constructor(target: any, ruleIndex: any, actionIndex: any, isCtxDependent: any);
    serializationType: any;
    ruleIndex: any;
    actionIndex: any;
    isCtxDependent: any;
    isEpsilon: boolean;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    toString(): string;
}
