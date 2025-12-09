export default class DFA {
    constructor(atnStartState: any, decision: any);
    /**
     * From which ATN state did we create this DFA?
     */
    atnStartState: any;
    decision: any;
    /**
     * A set of all DFA states. Use {@link Map} so we can get old state back
     * ({@link Set} only allows you to see if it's there).
     */
    _states: HashSet;
    s0: DFAState | null;
    /**
     * {@code true} if this DFA is for a precedence decision; otherwise,
     * {@code false}. This is the backing field for {@link //isPrecedenceDfa},
     * {@link //setPrecedenceDfa}
     */
    precedenceDfa: boolean;
    /**
     * Get the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @return The start state corresponding to the specified precedence, or
     * {@code null} if no start state exists for the specified precedence.
     *
     * @throws IllegalStateException if this is not a precedence DFA.
     * @see //isPrecedenceDfa()
     */
    getPrecedenceStartState(precedence: any): any;
    /**
     * Set the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @param startState The start state corresponding to the specified
     * precedence.
     *
     * @throws IllegalStateException if this is not a precedence DFA.
     * @see //isPrecedenceDfa()
     */
    setPrecedenceStartState(precedence: any, startState: any): void;
    /**
     * Sets whether this is a precedence DFA. If the specified value differs
     * from the current DFA configuration, the following actions are taken;
     * otherwise no changes are made to the current DFA.
     *
     * <ul>
     * <li>The {@link //states} map is cleared</li>
     * <li>If {@code precedenceDfa} is {@code false}, the initial state
     * {@link //s0} is set to {@code null}; otherwise, it is initialized to a new
     * {@link DFAState} with an empty outgoing {@link DFAState//edges} array to
     * store the start states for individual precedence values.</li>
     * <li>The {@link //precedenceDfa} field is updated</li>
     * </ul>
     *
     * @param precedenceDfa {@code true} if this is a precedence DFA; otherwise,
     * {@code false}
     */
    setPrecedenceDfa(precedenceDfa: any): void;
    /**
     * Return a list of all states in this DFA, ordered by state number.
     */
    sortedStates(): any[];
    toString(literalNames: any, symbolicNames: any): string | null;
    toLexerString(): string | null;
    get states(): HashSet;
}
import HashSet from "../misc/HashSet.js";
import DFAState from "./DFAState.js";
