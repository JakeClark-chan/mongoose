/**
 * Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
 *
 * <p>The {@code popMode} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerPopModeAction extends LexerAction {
    constructor();
    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer: any): void;
}
declare namespace LexerPopModeAction {
    const INSTANCE: LexerPopModeAction;
}
export default LexerPopModeAction;
import LexerAction from "./LexerAction.js";
