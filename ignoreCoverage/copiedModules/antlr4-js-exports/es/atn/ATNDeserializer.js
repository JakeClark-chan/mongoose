"use strict";
/* Copyright (c) 2012-2022 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_js_1 = __importDefault(require("../Token.js"));
const ATN_js_1 = __importDefault(require("./ATN.js"));
const ATNType_js_1 = __importDefault(require("./ATNType.js"));
const ATNState_js_1 = __importDefault(require("../state/ATNState.js"));
const BasicState_js_1 = __importDefault(require("../state/BasicState.js"));
const DecisionState_js_1 = __importDefault(require("../state/DecisionState.js"));
const BlockStartState_js_1 = __importDefault(require("../state/BlockStartState.js"));
const BlockEndState_js_1 = __importDefault(require("../state/BlockEndState.js"));
const LoopEndState_js_1 = __importDefault(require("../state/LoopEndState.js"));
const RuleStartState_js_1 = __importDefault(require("../state/RuleStartState.js"));
const RuleStopState_js_1 = __importDefault(require("../state/RuleStopState.js"));
const TokensStartState_js_1 = __importDefault(require("../state/TokensStartState.js"));
const PlusLoopbackState_js_1 = __importDefault(require("../state/PlusLoopbackState.js"));
const StarLoopbackState_js_1 = __importDefault(require("../state/StarLoopbackState.js"));
const StarLoopEntryState_js_1 = __importDefault(require("../state/StarLoopEntryState.js"));
const PlusBlockStartState_js_1 = __importDefault(require("../state/PlusBlockStartState.js"));
const StarBlockStartState_js_1 = __importDefault(require("../state/StarBlockStartState.js"));
const BasicBlockStartState_js_1 = __importDefault(require("../state/BasicBlockStartState.js"));
const Transition_js_1 = __importDefault(require("../transition/Transition.js"));
const AtomTransition_js_1 = __importDefault(require("../transition/AtomTransition.js"));
const SetTransition_js_1 = __importDefault(require("../transition/SetTransition.js"));
const NotSetTransition_js_1 = __importDefault(require("../transition/NotSetTransition.js"));
const RuleTransition_js_1 = __importDefault(require("../transition/RuleTransition.js"));
const RangeTransition_js_1 = __importDefault(require("../transition/RangeTransition.js"));
const ActionTransition_js_1 = __importDefault(require("../transition/ActionTransition.js"));
const EpsilonTransition_js_1 = __importDefault(require("../transition/EpsilonTransition.js"));
const WildcardTransition_js_1 = __importDefault(require("../transition/WildcardTransition.js"));
const PredicateTransition_js_1 = __importDefault(require("../transition/PredicateTransition.js"));
const PrecedencePredicateTransition_js_1 = __importDefault(require("../transition/PrecedencePredicateTransition.js"));
const IntervalSet_js_1 = __importDefault(require("../misc/IntervalSet.js"));
const ATNDeserializationOptions_js_1 = __importDefault(require("./ATNDeserializationOptions.js"));
const LexerActionType_js_1 = __importDefault(require("./LexerActionType.js"));
const LexerSkipAction_js_1 = __importDefault(require("../action/LexerSkipAction.js"));
const LexerChannelAction_js_1 = __importDefault(require("../action/LexerChannelAction.js"));
const LexerCustomAction_js_1 = __importDefault(require("../action/LexerCustomAction.js"));
const LexerMoreAction_js_1 = __importDefault(require("../action/LexerMoreAction.js"));
const LexerTypeAction_js_1 = __importDefault(require("../action/LexerTypeAction.js"));
const LexerPushModeAction_js_1 = __importDefault(require("../action/LexerPushModeAction.js"));
const LexerPopModeAction_js_1 = __importDefault(require("../action/LexerPopModeAction.js"));
const LexerModeAction_js_1 = __importDefault(require("../action/LexerModeAction.js"));
const SERIALIZED_VERSION = 4;
function initArray(length, value) {
    const tmp = [];
    tmp[length - 1] = value;
    return tmp.map(function (i) {
        return value;
    });
}
class ATNDeserializer {
    constructor(options) {
        if (options === undefined || options === null) {
            options = ATNDeserializationOptions_js_1.default.defaultOptions;
        }
        this.deserializationOptions = options;
        this.stateFactories = null;
        this.actionFactories = null;
    }
    deserialize(data) {
        const legacy = this.reset(data);
        this.checkVersion(legacy);
        if (legacy)
            this.skipUUID();
        const atn = this.readATN();
        this.readStates(atn, legacy);
        this.readRules(atn, legacy);
        this.readModes(atn);
        const sets = [];
        this.readSets(atn, sets, this.readInt.bind(this));
        if (legacy)
            this.readSets(atn, sets, this.readInt32.bind(this));
        this.readEdges(atn, sets);
        this.readDecisions(atn);
        this.readLexerActions(atn, legacy);
        this.markPrecedenceDecisions(atn);
        this.verifyATN(atn);
        if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType_js_1.default.PARSER) {
            this.generateRuleBypassTransitions(atn);
            // re-verify after modification
            this.verifyATN(atn);
        }
        return atn;
    }
    reset(data) {
        const version = data.charCodeAt ? data.charCodeAt(0) : data[0];
        if (version === SERIALIZED_VERSION - 1) {
            const adjust = function (c) {
                const v = c.charCodeAt(0);
                return v > 1 ? v - 2 : v + 65534;
            };
            const temp = data.split("").map(adjust);
            // don't adjust the first value since that's the version number
            temp[0] = data.charCodeAt(0);
            this.data = temp;
            this.pos = 0;
            return true;
        }
        else {
            this.data = data;
            this.pos = 0;
            return false;
        }
    }
    skipUUID() {
        let count = 0;
        while (count++ < 8)
            this.readInt();
    }
    checkVersion(legacy) {
        const version = this.readInt();
        if (!legacy && version !== SERIALIZED_VERSION) {
            throw "Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").";
        }
    }
    readATN() {
        const grammarType = this.readInt();
        const maxTokenType = this.readInt();
        return new ATN_js_1.default(grammarType, maxTokenType);
    }
    readStates(atn, legacy) {
        let j, pair, stateNumber;
        const loopBackStateNumbers = [];
        const endStateNumbers = [];
        const nstates = this.readInt();
        for (let i = 0; i < nstates; i++) {
            const stype = this.readInt();
            // ignore bad type of states
            if (stype === ATNState_js_1.default.INVALID_TYPE) {
                atn.addState(null);
                continue;
            }
            let ruleIndex = this.readInt();
            if (legacy && ruleIndex === 0xFFFF) {
                ruleIndex = -1;
            }
            const s = this.stateFactory(stype, ruleIndex);
            if (stype === ATNState_js_1.default.LOOP_END) {
                // special case
                const loopBackStateNumber = this.readInt();
                loopBackStateNumbers.push([s, loopBackStateNumber]);
            }
            else if (s instanceof BlockStartState_js_1.default) {
                const endStateNumber = this.readInt();
                endStateNumbers.push([s, endStateNumber]);
            }
            atn.addState(s);
        }
        // delay the assignment of loop back and end states until we know all the
        // state instances have been initialized
        for (j = 0; j < loopBackStateNumbers.length; j++) {
            pair = loopBackStateNumbers[j];
            pair[0].loopBackState = atn.states[pair[1]];
        }
        for (j = 0; j < endStateNumbers.length; j++) {
            pair = endStateNumbers[j];
            pair[0].endState = atn.states[pair[1]];
        }
        let numNonGreedyStates = this.readInt();
        for (j = 0; j < numNonGreedyStates; j++) {
            stateNumber = this.readInt();
            atn.states[stateNumber].nonGreedy = true;
        }
        let numPrecedenceStates = this.readInt();
        for (j = 0; j < numPrecedenceStates; j++) {
            stateNumber = this.readInt();
            atn.states[stateNumber].isPrecedenceRule = true;
        }
    }
    readRules(atn, legacy) {
        let i;
        const nrules = this.readInt();
        if (atn.grammarType === ATNType_js_1.default.LEXER) {
            atn.ruleToTokenType = initArray(nrules, 0);
        }
        atn.ruleToStartState = initArray(nrules, 0);
        for (i = 0; i < nrules; i++) {
            const s = this.readInt();
            atn.ruleToStartState[i] = atn.states[s];
            if (atn.grammarType === ATNType_js_1.default.LEXER) {
                let tokenType = this.readInt();
                if (legacy && tokenType === 0xFFFF) {
                    tokenType = Token_js_1.default.EOF;
                }
                atn.ruleToTokenType[i] = tokenType;
            }
        }
        atn.ruleToStopState = initArray(nrules, 0);
        for (i = 0; i < atn.states.length; i++) {
            const state = atn.states[i];
            if (!(state instanceof RuleStopState_js_1.default)) {
                continue;
            }
            atn.ruleToStopState[state.ruleIndex] = state;
            atn.ruleToStartState[state.ruleIndex].stopState = state;
        }
    }
    readModes(atn) {
        const nmodes = this.readInt();
        for (let i = 0; i < nmodes; i++) {
            let s = this.readInt();
            atn.modeToStartState.push(atn.states[s]);
        }
    }
    readSets(atn, sets, reader) {
        const m = this.readInt();
        for (let i = 0; i < m; i++) {
            const iset = new IntervalSet_js_1.default();
            sets.push(iset);
            const n = this.readInt();
            const containsEof = this.readInt();
            if (containsEof !== 0) {
                iset.addOne(-1);
            }
            for (let j = 0; j < n; j++) {
                const i1 = reader();
                const i2 = reader();
                iset.addRange(i1, i2);
            }
        }
    }
    readEdges(atn, sets) {
        let i, j, state, trans, target;
        const nedges = this.readInt();
        for (i = 0; i < nedges; i++) {
            const src = this.readInt();
            const trg = this.readInt();
            const ttype = this.readInt();
            const arg1 = this.readInt();
            const arg2 = this.readInt();
            const arg3 = this.readInt();
            trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
            const srcState = atn.states[src];
            srcState.addTransition(trans);
        }
        // edges for rule stop states can be derived, so they aren't serialized
        for (i = 0; i < atn.states.length; i++) {
            state = atn.states[i];
            for (j = 0; j < state.transitions.length; j++) {
                const t = state.transitions[j];
                if (!(t instanceof RuleTransition_js_1.default)) {
                    continue;
                }
                let outermostPrecedenceReturn = -1;
                if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
                    if (t.precedence === 0) {
                        outermostPrecedenceReturn = t.target.ruleIndex;
                    }
                }
                trans = new EpsilonTransition_js_1.default(t.followState, outermostPrecedenceReturn);
                atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
            }
        }
        for (i = 0; i < atn.states.length; i++) {
            state = atn.states[i];
            if (state instanceof BlockStartState_js_1.default) {
                // we need to know the end state to set its start state
                if (state.endState === null) {
                    throw "IllegalState";
                }
                // block end states can only be associated to a single block start
                // state
                if (state.endState.startState !== null) {
                    throw "IllegalState";
                }
                state.endState.startState = state;
            }
            if (state instanceof PlusLoopbackState_js_1.default) {
                for (j = 0; j < state.transitions.length; j++) {
                    target = state.transitions[j].target;
                    if (target instanceof PlusBlockStartState_js_1.default) {
                        target.loopBackState = state;
                    }
                }
            }
            else if (state instanceof StarLoopbackState_js_1.default) {
                for (j = 0; j < state.transitions.length; j++) {
                    target = state.transitions[j].target;
                    if (target instanceof StarLoopEntryState_js_1.default) {
                        target.loopBackState = state;
                    }
                }
            }
        }
    }
    readDecisions(atn) {
        const ndecisions = this.readInt();
        for (let i = 0; i < ndecisions; i++) {
            const s = this.readInt();
            const decState = atn.states[s];
            atn.decisionToState.push(decState);
            decState.decision = i;
        }
    }
    readLexerActions(atn, legacy) {
        if (atn.grammarType === ATNType_js_1.default.LEXER) {
            const count = this.readInt();
            atn.lexerActions = initArray(count, null);
            for (let i = 0; i < count; i++) {
                const actionType = this.readInt();
                let data1 = this.readInt();
                if (legacy && data1 === 0xFFFF) {
                    data1 = -1;
                }
                let data2 = this.readInt();
                if (legacy && data2 === 0xFFFF) {
                    data2 = -1;
                }
                atn.lexerActions[i] = this.lexerActionFactory(actionType, data1, data2);
            }
        }
    }
    generateRuleBypassTransitions(atn) {
        let i;
        const count = atn.ruleToStartState.length;
        for (i = 0; i < count; i++) {
            atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
        }
        for (i = 0; i < count; i++) {
            this.generateRuleBypassTransition(atn, i);
        }
    }
    generateRuleBypassTransition(atn, idx) {
        let i, state;
        const bypassStart = new BasicBlockStartState_js_1.default();
        bypassStart.ruleIndex = idx;
        atn.addState(bypassStart);
        const bypassStop = new BlockEndState_js_1.default();
        bypassStop.ruleIndex = idx;
        atn.addState(bypassStop);
        bypassStart.endState = bypassStop;
        atn.defineDecisionState(bypassStart);
        bypassStop.startState = bypassStart;
        let excludeTransition = null;
        let endState = null;
        if (atn.ruleToStartState[idx].isPrecedenceRule) {
            // wrap from the beginning of the rule to the StarLoopEntryState
            endState = null;
            for (i = 0; i < atn.states.length; i++) {
                state = atn.states[i];
                if (this.stateIsEndStateFor(state, idx)) {
                    endState = state;
                    excludeTransition = state.loopBackState.transitions[0];
                    break;
                }
            }
            if (excludeTransition === null) {
                throw "Couldn't identify final state of the precedence rule prefix section.";
            }
        }
        else {
            endState = atn.ruleToStopState[idx];
        }
        // all non-excluded transitions that currently target end state need to
        // target blockEnd instead
        for (i = 0; i < atn.states.length; i++) {
            state = atn.states[i];
            for (let j = 0; j < state.transitions.length; j++) {
                const transition = state.transitions[j];
                if (transition === excludeTransition) {
                    continue;
                }
                if (transition.target === endState) {
                    transition.target = bypassStop;
                }
            }
        }
        // all transitions leaving the rule start state need to leave blockStart
        // instead
        const ruleToStartState = atn.ruleToStartState[idx];
        const count = ruleToStartState.transitions.length;
        while (count > 0) {
            bypassStart.addTransition(ruleToStartState.transitions[count - 1]);
            ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
        }
        // link the new states
        atn.ruleToStartState[idx].addTransition(new EpsilonTransition_js_1.default(bypassStart));
        bypassStop.addTransition(new EpsilonTransition_js_1.default(endState));
        const matchState = new BasicState_js_1.default();
        atn.addState(matchState);
        matchState.addTransition(new AtomTransition_js_1.default(bypassStop, atn.ruleToTokenType[idx]));
        bypassStart.addTransition(new EpsilonTransition_js_1.default(matchState));
    }
    stateIsEndStateFor(state, idx) {
        if (state.ruleIndex !== idx) {
            return null;
        }
        if (!(state instanceof StarLoopEntryState_js_1.default)) {
            return null;
        }
        const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
        if (!(maybeLoopEndState instanceof LoopEndState_js_1.default)) {
            return null;
        }
        if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState_js_1.default) {
            return state;
        }
        else {
            return null;
        }
    }
    /**
     * Analyze the {@link StarLoopEntryState} states in the specified ATN to set
     * the {@link StarLoopEntryState//isPrecedenceDecision} field to the
     * correct value.
     * @param atn The ATN.
     */
    markPrecedenceDecisions(atn) {
        for (let i = 0; i < atn.states.length; i++) {
            const state = atn.states[i];
            if (!(state instanceof StarLoopEntryState_js_1.default)) {
                continue;
            }
            // We analyze the ATN to determine if this ATN decision state is the
            // decision for the closure block that determines whether a
            // precedence rule should continue or complete.
            if (atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
                const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
                if (maybeLoopEndState instanceof LoopEndState_js_1.default) {
                    if (maybeLoopEndState.epsilonOnlyTransitions && maybeLoopEndState.transitions[0].target instanceof RuleStopState_js_1.default) {
                        state.isPrecedenceDecision = true;
                    }
                }
            }
        }
    }
    verifyATN(atn) {
        if (!this.deserializationOptions.verifyATN) {
            return;
        }
        // verify assumptions
        for (let i = 0; i < atn.states.length; i++) {
            const state = atn.states[i];
            if (state === null) {
                continue;
            }
            this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
            if (state instanceof PlusBlockStartState_js_1.default) {
                this.checkCondition(state.loopBackState !== null);
            }
            else if (state instanceof StarLoopEntryState_js_1.default) {
                this.checkCondition(state.loopBackState !== null);
                this.checkCondition(state.transitions.length === 2);
                if (state.transitions[0].target instanceof StarBlockStartState_js_1.default) {
                    this.checkCondition(state.transitions[1].target instanceof LoopEndState_js_1.default);
                    this.checkCondition(!state.nonGreedy);
                }
                else if (state.transitions[0].target instanceof LoopEndState_js_1.default) {
                    this.checkCondition(state.transitions[1].target instanceof StarBlockStartState_js_1.default);
                    this.checkCondition(state.nonGreedy);
                }
                else {
                    throw "IllegalState";
                }
            }
            else if (state instanceof StarLoopbackState_js_1.default) {
                this.checkCondition(state.transitions.length === 1);
                this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState_js_1.default);
            }
            else if (state instanceof LoopEndState_js_1.default) {
                this.checkCondition(state.loopBackState !== null);
            }
            else if (state instanceof RuleStartState_js_1.default) {
                this.checkCondition(state.stopState !== null);
            }
            else if (state instanceof BlockStartState_js_1.default) {
                this.checkCondition(state.endState !== null);
            }
            else if (state instanceof BlockEndState_js_1.default) {
                this.checkCondition(state.startState !== null);
            }
            else if (state instanceof DecisionState_js_1.default) {
                this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
            }
            else {
                this.checkCondition(state.transitions.length <= 1 || state instanceof RuleStopState_js_1.default);
            }
        }
    }
    checkCondition(condition, message) {
        if (!condition) {
            if (message === undefined || message === null) {
                message = "IllegalState";
            }
            throw message;
        }
    }
    readInt() {
        return this.data[this.pos++];
    }
    readInt32() {
        const low = this.readInt();
        const high = this.readInt();
        return low | high << 16;
    }
    edgeFactory(atn, type, src, trg, arg1, arg2, arg3, sets) {
        const target = atn.states[trg];
        switch (type) {
            case Transition_js_1.default.EPSILON:
                return new EpsilonTransition_js_1.default(target);
            case Transition_js_1.default.RANGE:
                return arg3 !== 0 ? new RangeTransition_js_1.default(target, Token_js_1.default.EOF, arg2) : new RangeTransition_js_1.default(target, arg1, arg2);
            case Transition_js_1.default.RULE:
                return new RuleTransition_js_1.default(atn.states[arg1], arg2, arg3, target);
            case Transition_js_1.default.PREDICATE:
                return new PredicateTransition_js_1.default(target, arg1, arg2, arg3 !== 0);
            case Transition_js_1.default.PRECEDENCE:
                return new PrecedencePredicateTransition_js_1.default(target, arg1);
            case Transition_js_1.default.ATOM:
                return arg3 !== 0 ? new AtomTransition_js_1.default(target, Token_js_1.default.EOF) : new AtomTransition_js_1.default(target, arg1);
            case Transition_js_1.default.ACTION:
                return new ActionTransition_js_1.default(target, arg1, arg2, arg3 !== 0);
            case Transition_js_1.default.SET:
                return new SetTransition_js_1.default(target, sets[arg1]);
            case Transition_js_1.default.NOT_SET:
                return new NotSetTransition_js_1.default(target, sets[arg1]);
            case Transition_js_1.default.WILDCARD:
                return new WildcardTransition_js_1.default(target);
            default:
                throw "The specified transition type: " + type + " is not valid.";
        }
    }
    stateFactory(type, ruleIndex) {
        if (this.stateFactories === null) {
            const sf = [];
            sf[ATNState_js_1.default.INVALID_TYPE] = null;
            sf[ATNState_js_1.default.BASIC] = () => new BasicState_js_1.default();
            sf[ATNState_js_1.default.RULE_START] = () => new RuleStartState_js_1.default();
            sf[ATNState_js_1.default.BLOCK_START] = () => new BasicBlockStartState_js_1.default();
            sf[ATNState_js_1.default.PLUS_BLOCK_START] = () => new PlusBlockStartState_js_1.default();
            sf[ATNState_js_1.default.STAR_BLOCK_START] = () => new StarBlockStartState_js_1.default();
            sf[ATNState_js_1.default.TOKEN_START] = () => new TokensStartState_js_1.default();
            sf[ATNState_js_1.default.RULE_STOP] = () => new RuleStopState_js_1.default();
            sf[ATNState_js_1.default.BLOCK_END] = () => new BlockEndState_js_1.default();
            sf[ATNState_js_1.default.STAR_LOOP_BACK] = () => new StarLoopbackState_js_1.default();
            sf[ATNState_js_1.default.STAR_LOOP_ENTRY] = () => new StarLoopEntryState_js_1.default();
            sf[ATNState_js_1.default.PLUS_LOOP_BACK] = () => new PlusLoopbackState_js_1.default();
            sf[ATNState_js_1.default.LOOP_END] = () => new LoopEndState_js_1.default();
            this.stateFactories = sf;
        }
        if (type > this.stateFactories.length || this.stateFactories[type] === null) {
            throw "The specified state type " + type + " is not valid.";
        }
        else {
            const s = this.stateFactories[type]();
            if (s !== null) {
                s.ruleIndex = ruleIndex;
                return s;
            }
        }
    }
    lexerActionFactory(type, data1, data2) {
        if (this.actionFactories === null) {
            const af = [];
            af[LexerActionType_js_1.default.CHANNEL] = (data1, data2) => new LexerChannelAction_js_1.default(data1);
            af[LexerActionType_js_1.default.CUSTOM] = (data1, data2) => new LexerCustomAction_js_1.default(data1, data2);
            af[LexerActionType_js_1.default.MODE] = (data1, data2) => new LexerModeAction_js_1.default(data1);
            af[LexerActionType_js_1.default.MORE] = (data1, data2) => LexerMoreAction_js_1.default.INSTANCE;
            af[LexerActionType_js_1.default.POP_MODE] = (data1, data2) => LexerPopModeAction_js_1.default.INSTANCE;
            af[LexerActionType_js_1.default.PUSH_MODE] = (data1, data2) => new LexerPushModeAction_js_1.default(data1);
            af[LexerActionType_js_1.default.SKIP] = (data1, data2) => LexerSkipAction_js_1.default.INSTANCE;
            af[LexerActionType_js_1.default.TYPE] = (data1, data2) => new LexerTypeAction_js_1.default(data1);
            this.actionFactories = af;
        }
        if (type > this.actionFactories.length || this.actionFactories[type] === null) {
            throw "The specified lexer action type " + type + " is not valid.";
        }
        else {
            return this.actionFactories[type](data1, data2);
        }
    }
}
exports.default = ATNDeserializer;
