export const __esModule: boolean;
export default LexerModeAction;
declare const LexerModeAction_base: any;
/**
 * Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
 * the assigned mode
 */
declare class LexerModeAction extends LexerModeAction_base {
    [x: string]: any;
    constructor(mode: any);
    mode: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//mode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
