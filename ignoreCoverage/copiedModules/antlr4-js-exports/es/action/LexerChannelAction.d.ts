/**
 * Implements the {@code channel} lexer action by calling
 * {@link Lexer//setChannel} with the assigned channel.
 * Constructs a new {@code channel} action with the specified channel value.
 * @param channel The channel value to pass to {@link Lexer//setChannel}
 */
export default class LexerChannelAction extends LexerAction {
    channel: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//setChannel} with the
     * value provided by {@link //getChannel}.</p>
     */
    execute(lexer: any): void;
}
import LexerAction from "./LexerAction.js";
