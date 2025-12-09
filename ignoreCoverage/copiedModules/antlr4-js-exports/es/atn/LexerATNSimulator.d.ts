declare class LexerATNSimulator extends ATNSimulator {
    /**
     * When we hit an accept state in either the DFA or the ATN, we
     * have to notify the character stream to start buffering characters
     * via {@link IntStream//mark} and record the current state. The current sim state
     * includes the current index into the input, the current line,
     * and current character position in that line. Note that the Lexer is
     * tracking the starting line and characterization of the token. These
     * variables track the "state" of the simulator when it hits an accept state.
     *
     * <p>We track these variables separately for the DFA and ATN simulation
     * because the DFA simulation often has to fail over to the ATN
     * simulation. If the ATN simulation fails, we need the DFA to fall
     * back to its previously accepted state, if any. If the ATN succeeds,
     * then the ATN does the accept and the DFA simulator that invoked it
     * can simply return the predicted token type.</p>
     */
    constructor(recog: any, atn: any, decisionToDFA: any, sharedContextCache: any);
    decisionToDFA: any;
    recog: any;
    /**
     * The current token's starting index into the character stream.
     * Shared across DFA to ATN simulation in case the ATN fails and the
     * DFA did not have a previous accept state. In this case, we use the
     * ATN-generated exception object
     */
    startIndex: number;
    line: number;
    /**
     * The index of the character relative to the beginning of the line
     * 0..n-1
     */
    column: number;
    mode: number;
    /**
     * Used during DFA/ATN exec to record the most recent accept configuration
     * info
     */
    prevAccept: SimState;
    copyState(simulator: any): void;
    match(input: any, mode: any): any;
    reset(): void;
    matchATN(input: any): any;
    execATN(input: any, ds0: any): any;
    /**
     * Get an existing target state for an edge in the DFA. If the target state
     * for the edge has not yet been computed or is otherwise not available,
     * this method returns {@code null}.
     *
     * @param s The current DFA state
     * @param t The next input symbol
     * @return The existing target DFA state for the given input symbol
     * {@code t}, or {@code null} if the target state for this edge is not
     * already cached
     */
    getExistingTargetState(s: any, t: any): any;
    /**
     * Compute a target state for an edge in the DFA, and attempt to add the
     * computed state and corresponding edge to the DFA.
     *
     * @param input The input stream
     * @param s The current DFA state
     * @param t The next input symbol
     *
     * @return The computed target DFA state for the given input symbol
     * {@code t}. If {@code t} does not lead to a valid DFA state, this method
     * returns {@link //ERROR}.
     */
    computeTargetState(input: any, s: any, t: any): any;
    failOrAccept(prevAccept: any, input: any, reach: any, t: any): any;
    /**
     * Given a starting configuration set, figure out all ATN configurations
     * we can reach upon input {@code t}. Parameter {@code reach} is a return
     * parameter.
     */
    getReachableConfigSet(input: any, closure: any, reach: any, t: any): void;
    accept(input: any, lexerActionExecutor: any, startIndex: any, index: any, line: any, charPos: any): void;
    getReachableTarget(trans: any, t: any): any;
    computeStartState(input: any, p: any): OrderedATNConfigSet;
    /**
     * Since the alternatives within any lexer decision are ordered by
     * preference, this method stops pursuing the closure as soon as an accept
     * state is reached. After the first accept state is reached by depth-first
     * search from {@code config}, all other (potentially reachable) states for
     * this rule would have a lower priority.
     *
     * @return {Boolean} {@code true} if an accept state is reached, otherwise
     * {@code false}.
     */
    closure(input: any, config: any, configs: any, currentAltReachedAcceptState: any, speculative: any, treatEofAsEpsilon: any): boolean;
    getEpsilonTarget(input: any, config: any, trans: any, configs: any, speculative: any, treatEofAsEpsilon: any): LexerATNConfig | null;
    /**
     * Evaluate a predicate specified in the lexer.
     *
     * <p>If {@code speculative} is {@code true}, this method was called before
     * {@link //consume} for the matched character. This method should call
     * {@link //consume} before evaluating the predicate to ensure position
     * sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
     * and {@link Lexer//getcolumn}, properly reflect the current
     * lexer state. This method should restore {@code input} and the simulator
     * to the original state before returning (i.e. undo the actions made by the
     * call to {@link //consume}.</p>
     *
     * @param input The input stream.
     * @param ruleIndex The rule containing the predicate.
     * @param predIndex The index of the predicate within the rule.
     * @param speculative {@code true} if the current index in {@code input} is
     * one character before the predicate's location.
     *
     * @return {@code true} if the specified predicate evaluates to
     * {@code true}.
     */
    evaluatePredicate(input: any, ruleIndex: any, predIndex: any, speculative: any): any;
    captureSimState(settings: any, input: any, dfaState: any): void;
    addDFAEdge(from_: any, tk: any, to: any, cfgs: any): any;
    /**
     * Add a new DFA state if there isn't one with this set of
     * configurations already. This method also detects the first
     * configuration containing an ATN rule stop state. Later, when
     * traversing the DFA, we will know which rule to accept.
     */
    addDFAState(configs: any): any;
    getDFA(mode: any): any;
    getText(input: any): any;
    consume(input: any): void;
    getTokenName(tt: any): string;
}
declare namespace LexerATNSimulator {
    const debug: boolean;
    const dfa_debug: boolean;
    const MIN_DFA_EDGE: number;
    const MAX_DFA_EDGE: number;
}
export default LexerATNSimulator;
import ATNSimulator from "./ATNSimulator.js";
declare class SimState {
    reset(): void;
}
import OrderedATNConfigSet from "./OrderedATNConfigSet.js";
import LexerATNConfig from "./LexerATNConfig.js";
