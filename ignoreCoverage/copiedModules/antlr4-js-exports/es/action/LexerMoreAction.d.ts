/**
 * Implements the {@code more} lexer action by calling {@link Lexer//more}.
 *
 * <p>The {@code more} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerMoreAction extends LexerAction {
    constructor();
    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer: any): void;
}
declare namespace LexerMoreAction {
    const INSTANCE: LexerMoreAction;
}
export default LexerMoreAction;
import LexerAction from "./LexerAction.js";
