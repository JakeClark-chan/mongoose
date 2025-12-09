export const __esModule: boolean;
export default LexerPopModeAction;
declare const LexerPopModeAction_base: any;
/**
 * Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
 *
 * <p>The {@code popMode} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerPopModeAction extends LexerPopModeAction_base {
    [x: string]: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer: any): void;
    toString(): string;
}
declare namespace LexerPopModeAction {
    const INSTANCE: LexerPopModeAction;
}
