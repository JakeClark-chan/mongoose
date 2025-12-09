export const __esModule: boolean;
export default LexerSkipAction;
declare const LexerSkipAction_base: any;
/**
 * Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
 *
 * <p>The {@code skip} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerSkipAction extends LexerSkipAction_base {
    [x: string]: any;
    execute(lexer: any): void;
    toString(): string;
}
declare namespace LexerSkipAction {
    const INSTANCE: LexerSkipAction;
}
