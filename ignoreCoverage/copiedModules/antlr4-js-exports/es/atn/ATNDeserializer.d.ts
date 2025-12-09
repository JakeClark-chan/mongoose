export default class ATNDeserializer {
    constructor(options: any);
    deserializationOptions: any;
    stateFactories: ((() => BasicState) | null)[] | null;
    actionFactories: {}[] | null;
    deserialize(data: any): ATN;
    reset(data: any): boolean;
    data: any;
    pos: number | undefined;
    skipUUID(): void;
    checkVersion(legacy: any): void;
    readATN(): ATN;
    readStates(atn: any, legacy: any): void;
    readRules(atn: any, legacy: any): void;
    readModes(atn: any): void;
    readSets(atn: any, sets: any, reader: any): void;
    readEdges(atn: any, sets: any): void;
    readDecisions(atn: any): void;
    readLexerActions(atn: any, legacy: any): void;
    generateRuleBypassTransitions(atn: any): void;
    generateRuleBypassTransition(atn: any, idx: any): void;
    stateIsEndStateFor(state: any, idx: any): StarLoopEntryState | null;
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
    edgeFactory(atn: any, type: any, src: any, trg: any, arg1: any, arg2: any, arg3: any, sets: any): RuleTransition | SetTransition | WildcardTransition | AtomTransition | RangeTransition | ActionTransition | EpsilonTransition | PredicateTransition | PrecedencePredicateTransition;
    stateFactory(type: any, ruleIndex: any): BasicState | undefined;
    lexerActionFactory(type: any, data1: any, data2: any): any;
}
import BasicState from "../state/BasicState.js";
import ATN from "./ATN.js";
import StarLoopEntryState from "../state/StarLoopEntryState.js";
import RuleTransition from "../transition/RuleTransition.js";
import SetTransition from "../transition/SetTransition.js";
import WildcardTransition from "../transition/WildcardTransition.js";
import AtomTransition from "../transition/AtomTransition.js";
import RangeTransition from "../transition/RangeTransition.js";
import ActionTransition from "../transition/ActionTransition.js";
import EpsilonTransition from "../transition/EpsilonTransition.js";
import PredicateTransition from "../transition/PredicateTransition.js";
import PrecedencePredicateTransition from "../transition/PrecedencePredicateTransition.js";
