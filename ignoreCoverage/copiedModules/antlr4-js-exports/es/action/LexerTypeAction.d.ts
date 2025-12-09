/**
 * Implements the {@code type} lexer action by calling {@link Lexer//setType}
 * with the assigned type
 */
export default class LexerTypeAction extends LexerAction {
    type: any;
    execute(lexer: any): void;
}
import LexerAction from "./LexerAction.js";
