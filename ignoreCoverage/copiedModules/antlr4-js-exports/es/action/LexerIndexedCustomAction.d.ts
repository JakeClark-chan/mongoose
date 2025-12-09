export default class LexerIndexedCustomAction extends LexerAction {
    constructor(offset: any, action: any);
    offset: any;
    action: any;
    /**
     * <p>This method calls {@link //execute} on the result of {@link //getAction}
     * using the provided {@code lexer}.</p>
     */
    execute(lexer: any): void;
}
import LexerAction from "./LexerAction.js";
