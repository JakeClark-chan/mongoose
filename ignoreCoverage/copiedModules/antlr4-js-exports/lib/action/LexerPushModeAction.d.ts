export const __esModule: boolean;
export default LexerPushModeAction;
declare const LexerPushModeAction_base: any;
/**
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
declare class LexerPushModeAction extends LexerPushModeAction_base {
    [x: string]: any;
    constructor(mode: any);
    mode: any;
    /**
     * <p>This action is implemented by calling {@link Lexer//pushMode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
