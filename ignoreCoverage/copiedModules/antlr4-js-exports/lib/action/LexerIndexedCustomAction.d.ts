export const __esModule: boolean;
export default LexerIndexedCustomAction;
declare const LexerIndexedCustomAction_base: any;
/**
 * This implementation of {@link LexerAction} is used for tracking input offsets
 * for position-dependent actions within a {@link LexerActionExecutor}.
 *
 * <p>This action is not serialized as part of the ATN, and is only required for
 * position-dependent lexer actions which appear at a location other than the
 * end of a rule. For more information about DFA optimizations employed for
 * lexer actions, see {@link LexerActionExecutor//append} and
 * {@link LexerActionExecutor//fixOffsetBeforeMatch}.</p>
 *
 * Constructs a new indexed custom action by associating a character offset
 * with a {@link LexerAction}.
 *
 * <p>Note: This class is only required for lexer actions for which
 * {@link LexerAction//isPositionDependent} returns {@code true}.</p>
 *
 * @param offset The offset into the input {@link CharStream}, relative to
 * the token start index, at which the specified lexer action should be
 * executed.
 * @param action The lexer action to execute at a particular offset in the
 * input {@link CharStream}.
 */
declare class LexerIndexedCustomAction extends LexerIndexedCustomAction_base {
    [x: string]: any;
    constructor(offset: any, action: any);
    offset: any;
    action: any;
    isPositionDependent: boolean;
    /**
     * <p>This method calls {@link //execute} on the result of {@link //getAction}
     * using the provided {@code lexer}.</p>
     */
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
}
