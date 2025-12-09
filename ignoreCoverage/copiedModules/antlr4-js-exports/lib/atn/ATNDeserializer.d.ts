export const __esModule: boolean;
export default ATNDeserializer;
declare class ATNDeserializer {
    constructor(options: any);
    deserializationOptions: any;
    stateFactories: ((() => any) | null)[] | null;
    actionFactories: {}[] | null;
    deserialize(data: any): any;
    reset(data: any): boolean;
    data: any;
    pos: number | undefined;
    skipUUID(): void;
    checkVersion(legacy: any): void;
    readATN(): any;
    readStates(atn: any, legacy: any): void;
    readRules(atn: any, legacy: any): void;
    readModes(atn: any): void;
    readSets(atn: any, sets: any, reader: any): void;
    readEdges(atn: any, sets: any): void;
    readDecisions(atn: any): void;
    readLexerActions(atn: any, legacy: any): void;
    generateRuleBypassTransitions(atn: any): void;
    generateRuleBypassTransition(atn: any, idx: any): void;
    stateIsEndStateFor(state: any, idx: any): any;
    /**
     * Analyze the {@link StarLoopEntryState} states in the specified ATN to set
     * the {@link StarLoopEntryState//isPrecedenceDecision} field to the
     * correct value.
     * @param atn The ATN.
     */
    markPrecedenceDecisions(atn: any): void;
    verifyATN(atn: any): void;
    checkCondition(condition: any, message: any): void;
    readInt(): any;
    readInt32(): number;
    edgeFactory(atn: any, type: any, src: any, trg: any, arg1: any, arg2: any, arg3: any, sets: any): any;
    stateFactory(type: any, ruleIndex: any): any;
    lexerActionFactory(type: any, data1: any, data2: any): any;
}
