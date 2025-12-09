/**
 * Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
 * the assigned mode
 */
export default class LexerModeAction extends LexerAction {
    mode: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//mode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer: any): void;
}
import LexerAction from "./LexerAction.js";
