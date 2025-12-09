export const __esModule: boolean;
export default LexerTypeAction;
declare const LexerTypeAction_base: any;
/**
 * Implements the {@code type} lexer action by calling {@link Lexer//setType}
 * with the assigned type
 */
declare class LexerTypeAction extends LexerTypeAction_base {
    [x: string]: any;
    constructor(type: any);
    type: any;
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
    toString(): string;
}
