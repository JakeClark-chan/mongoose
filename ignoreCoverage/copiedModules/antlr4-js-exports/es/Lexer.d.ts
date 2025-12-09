/**
 * A lexer is recognizer that draws input symbols from a character stream.
 * lexer grammars result in a subclass of this object. A Lexer object
 * uses simplified match() and error recovery mechanisms in the interest of speed.
 */
declare class Lexer extends Recognizer {
    constructor(input: any);
    _input: any;
    _factory: CommonTokenFactory;
    _tokenFactorySourcePair: any[];
    /**
     * The goal of all lexer rules/methods is to create a token object.
     * this is an instance variable as multiple rules may collaborate to
     * create a single token. nextToken will return this object after
     * matching lexer rule(s). If you subclass to allow multiple token
     * emissions, then set this to the last token to be matched or
     * something nonnull so that the auto token emit mechanism will not
     * emit another token.
     */
    _token: any;
    /**
     * What character index in the stream did the current token start at?
     * Needed, for example, to get the text for current token. Set at
     * the start of nextToken.
     */
    _tokenStartCharIndex: number;
    _tokenStartLine: number;
    _tokenStartColumn: number;
    _hitEOF: boolean;
    _channel: number;
    _type: number;
    _modeStack: any[];
    _mode: number;
    /**
     * You can set the text for the current token to override what is in
     * the input char buffer. Use setText() or can set this instance var.
     */
    _text: any;
    reset(): void;
    nextToken(): any;
    /**
     * Instruct the lexer to skip creating a token for current lexer rule
     * and look for another token. nextToken() knows to keep looking when
     * a lexer rule finishes with token set to SKIP_TOKEN. Recall that
     * if token==null at end of any token rule, it creates one for you
     * and emits it.
     */
    skip(): void;
    more(): void;
    mode(m: any): void;
    pushMode(m: any): void;
    popMode(): number;
    /**
     * By default does not support multiple emits per nextToken invocation
     * for efficiency reasons. Subclass and override this method, nextToken,
     * and getToken (to push tokens into a list and pull from that list
     * rather than a single variable as this implementation does).
     */
    emitToken(token: any): void;
    /**
     * The standard method called to automatically emit a token at the
     * outermost lexical rule. The token object should point into the
     * char buffer start..stop. If there is a text override in 'text',
     * use that to set the token's text. Override this method to emit
     * custom Token objects or provide a new factory.
     */
    emit(): import("./CommonToken.js").default;
    emitEOF(): import("./CommonToken.js").default;
    getCharIndex(): any;
    /**
     * Return a list of all Token objects in input char stream.
     * Forces load of all tokens. Does not include EOF token.
     */
    getAllTokens(): any[];
    notifyListeners(e: any): void;
    getErrorDisplay(s: any): string;
    getErrorDisplayForChar(c: any): any;
    getCharErrorDisplay(c: any): string;
    /**
     * Lexers can normally match any char in it's vocabulary after matching
     * a token, so do the easy thing and just kill a character and hope
     * it all works out. You can instead use the rule invocation stack
     * to do sophisticated error recovery if you are in a fragment rule.
     */
    recover(re: any): void;
    set inputStream(arg: any);
    get inputStream(): any;
    get sourceName(): any;
    set type(arg: number);
    get type(): number;
    set line(arg: any);
    get line(): any;
    set column(arg: any);
    get column(): any;
    set text(arg: any);
    get text(): any;
}
declare namespace Lexer {
    const DEFAULT_MODE: number;
    const MORE: number;
    const SKIP: number;
    const DEFAULT_TOKEN_CHANNEL: number;
    const HIDDEN: number;
    const MIN_CHAR_VALUE: number;
    const MAX_CHAR_VALUE: number;
}
export default Lexer;
import Recognizer from "./Recognizer.js";
import CommonTokenFactory from "./CommonTokenFactory.js";
