export const __esModule: boolean;
export default LexerCustomAction;
declare const LexerCustomAction_base: any;
/**
 * Executes a custom lexer action by calling {@link Recognizer//action} with the
 * rule and action indexes assigned to the custom action. The implementation of
 * a custom action is added to the generated code for the lexer in an override
 * of {@link Recognizer//action} when the grammar is compiled.
 *
 * <p>This class may represent embedded actions created with the <code>{...}</code>
 * syntax in ANTLR 4, as well as actions created for lexer commands where the
 * command argument could not be evaluated when the grammar was compiled.</p>
 */
declare class LexerCustomAction extends LexerCustomAction_base {
    [x: string]: any;
    /**
     * Constructs a custom lexer action with the specified rule and action
     * indexes.
     *
     * @param ruleIndex The rule index to use for calls to
     * {@link Recognizer//action}.
     * @param actionIndex The action index to use for calls to
     * {@link Recognizer//action}.
     */
    constructor(ruleIndex: any, actionIndex: any);
    ruleIndex: any;
    actionIndex: any;
    isPositionDependent: boolean;
    /**
     * <p>Custom actions are implemented by calling {@link Lexer//action} with the
     * appropriate rule and action indexes.</p>
     */
    execute(lexer: any): void;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
}
