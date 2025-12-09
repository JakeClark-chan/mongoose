/**
 * Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
 *
 * <p>The {@code skip} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerSkipAction extends LexerAction {
    constructor();
    execute(lexer: any): void;
}
declare namespace LexerSkipAction {
    const INSTANCE: LexerSkipAction;
}
export default LexerSkipAction;
import LexerAction from "./LexerAction.js";
