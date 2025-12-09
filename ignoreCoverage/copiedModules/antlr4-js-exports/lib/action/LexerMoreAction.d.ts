export const __esModule: boolean;
export default LexerMoreAction;
declare const LexerMoreAction_base: any;
/**
 * Implements the {@code more} lexer action by calling {@link Lexer//more}.
 *
 * <p>The {@code more} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
declare class LexerMoreAction extends LexerMoreAction_base {
    [x: string]: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer: any): void;
    toString(): string;
}
declare namespace LexerMoreAction {
    const INSTANCE: LexerMoreAction;
}
