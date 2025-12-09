export const __esModule: boolean;
export default ATNState;
/**
 * The following images show the relation of states and
 * {@link ATNState//transitions} for various grammar constructs.
 *
 * <ul>
 *
 * <li>Solid edges marked with an &//0949; indicate a required
 * {@link EpsilonTransition}.</li>
 *
 * <li>Dashed edges indicate locations where any transition derived from
 * {@link Transition} might appear.</li>
 *
 * <li>Dashed nodes are place holders for either a sequence of linked
 * {@link BasicState} states or the inclusion of a block representing a nested
 * construct in one of the forms below.</li>
 *
 * <li>Nodes showing multiple outgoing alternatives with a {@code ...} support
 * any number of alternatives (one or more). Nodes without the {@code ...} only
 * support the exact number of alternatives shown in the diagram.</li>
 *
 * </ul>
 *
 * <h2>Basic Blocks</h2>
 *
 * <h3>Rule</h3>
 *
 * <embed src="images/Rule.svg" type="image/svg+xml"/>
 *
 * <h3>Block of 1 or more alternatives</h3>
 *
 * <embed src="images/Block.svg" type="image/svg+xml"/>
 *
 * <h2>Greedy Loops</h2>
 *
 * <h3>Greedy Closure: {@code (...)*}</h3>
 *
 * <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Positive Closure: {@code (...)+}</h3>
 *
 * <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Optional: {@code (...)?}</h3>
 *
 * <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
 *
 * <h2>Non-Greedy Loops</h2>
 *
 * <h3>Non-Greedy Closure: {@code (...)*?}</h3>
 *
 * <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Positive Closure: {@code (...)+?}</h3>
 *
 * <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Optional: {@code (...)??}</h3>
 *
 * <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
 */
declare class ATNState {
    atn: any;
    stateNumber: number;
    stateType: any;
    ruleIndex: number;
    epsilonOnlyTransitions: boolean;
    transitions: any[];
    nextTokenWithinRule: any;
    toString(): number;
    equals(other: any): boolean;
    isNonGreedyExitState(): boolean;
    addTransition(trans: any, index: any): void;
}
declare namespace ATNState {
    const INVALID_TYPE: number;
    const BASIC: number;
    const RULE_START: number;
    const BLOCK_START: number;
    const PLUS_BLOCK_START: number;
    const STAR_BLOCK_START: number;
    const TOKEN_START: number;
    const RULE_STOP: number;
    const BLOCK_END: number;
    const STAR_LOOP_BACK: number;
    const STAR_LOOP_ENTRY: number;
    const PLUS_LOOP_BACK: number;
    const LOOP_END: number;
    const serializationNames: string[];
    const INVALID_STATE_NUMBER: number;
}
