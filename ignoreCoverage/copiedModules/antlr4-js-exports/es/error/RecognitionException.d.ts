/**
 * The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
 *  3 kinds of errors: prediction errors, failed predicate errors, and
 *  mismatched input errors. In each case, the parser knows where it is
 *  in the input, where it is in the ATN, the rule invocation stack,
 *  and what kind of problem occurred.
 */
export default class RecognitionException extends Error {
    constructor(params: any);
    message: any;
    recognizer: any;
    input: any;
    ctx: any;
    /**
     * The current {@link Token} when an error occurred. Since not all streams
     * support accessing symbols by index, we have to track the {@link Token}
     * instance itself
    */
    offendingToken: any;
    /**
     * Get the ATN state number the parser was in at the time the error
     * occurred. For {@link NoViableAltException} and
     * {@link LexerNoViableAltException} exceptions, this is the
     * {@link DecisionState} number. For others, it is the state whose outgoing
     * edge we couldn't match.
     */
    offendingState: any;
    /**
     * Gets the set of input symbols which could potentially follow the
     * previously matched symbol at the time this exception was thrown.
     *
     * <p>If the set of expected tokens is not known and could not be computed,
     * this method returns {@code null}.</p>
     *
     * @return The set of token types that could potentially follow the current
     * state in the ATN, or {@code null} if the information is not available.
     */
    getExpectedTokens(): any;
    toString(): any;
}
