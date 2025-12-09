/**
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
export default class LexerPushModeAction extends LexerAction {
    mode: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//pushMode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer: any): void;
}
import LexerAction from "./LexerAction.js";
