export const __esModule: boolean;
export default Recognizer;
declare class Recognizer {
    _listeners: any[];
    _interp: any;
    _stateNumber: number;
    checkVersion(toolVersion: any): void;
    addErrorListener(listener: any): void;
    removeErrorListeners(): void;
    getLiteralNames(): any;
    getSymbolicNames(): any;
    getTokenNames(): any[];
    tokenNames: any[] | undefined;
    getTokenTypeMap(): any;
    /**
     * Get a map from rule names to rule indexes.
     * <p>Used for XPath and tree pattern compilation.</p>
     */
    getRuleIndexMap(): any;
    getTokenType(tokenName: any): any;
    getErrorHeader(e: any): string;
    /**
     * How should a token be displayed in an error message? The default
     * is to display just the text, but during development you might
     * want to have a lot of information spit out.  Override in that case
     * to use t.toString() (which, for CommonToken, dumps everything about
     * the token). This is better than forcing you to override a method in
     * your token objects because you don't have to go modify your lexer
     * so that it creates a new Java type.
     *
     * @deprecated This method is not called by the ANTLR 4 Runtime. Specific
     * implementations of {@link ANTLRErrorStrategy} may provide a similar
     * feature when necessary. For example, see
     * {@link DefaultErrorStrategy//getTokenErrorDisplay}.*/
    getTokenErrorDisplay(t: any): string;
    getErrorListenerDispatch(): any;
    /**
     * subclass needs to override these if there are sempreds or actions
     * that the ATN interp needs to execute
     */
    sempred(localctx: any, ruleIndex: any, actionIndex: any): boolean;
    precpred(localctx: any, precedence: any): boolean;
    get atn(): any;
    set state(arg: number);
    get state(): number;
}
declare namespace Recognizer {
    const tokenTypeMapCache: {};
    const ruleIndexMapCache: {};
}
