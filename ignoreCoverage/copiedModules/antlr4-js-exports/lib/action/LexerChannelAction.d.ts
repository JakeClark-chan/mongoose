export const __esModule: boolean;
export default LexerChannelAction;
declare const LexerChannelAction_base: any;
/**
 * Implements the {@code channel} lexer action by calling
 * {@link Lexer//setChannel} with the assigned channel.
 * Constructs a new {@code channel} action with the specified channel value.
 * @param channel The channel value to pass to {@link Lexer//setChannel}
 */
declare class LexerChannelAction extends LexerChannelAction_base {
    [x: string]: any;
    constructor(channel: any);
    channel: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//setChannel} with the
     * value provided by {@link //getChannel}.</p>
     */
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
