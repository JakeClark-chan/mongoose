export const __esModule: boolean;
export default Parser;
declare const Parser_base: any;
declare class Parser extends Parser_base {
    [x: string]: any;
    /**
     * this is all the parsing support code essentially; most of it is error
     * recovery stuff.
     */
    constructor(input: any);
    _input: any;
    /**
     * The error handling strategy for the parser. The default value is a new
     * instance of {@link DefaultErrorStrategy}.
     */
    _errHandler: any;
    _precedenceStack: number[];
    /**
     * The {@link ParserRuleContext} object for the currently executing rule.
     * this is always non-null during the parsing process.
     */
    _ctx: any;
    /**
     * Specifies whether or not the parser should construct a parse tree during
     * the parsing process. The default value is {@code true}.
     */
    buildParseTrees: boolean;
    /**
     * When {@link //setTrace}{@code (true)} is called, a reference to the
     * {@link TraceListener} is stored here so it can be easily removed in a
     * later call to {@link //setTrace}{@code (false)}. The listener itself is
     * implemented as a parser listener so this field is not directly used by
     * other parser methods.
     */
    _tracer: any;
    /**
     * The list of {@link ParseTreeListener} listeners registered to receive
     * events during the parse.
     */
    _parseListeners: any[] | null;
    /**
     * The number of syntax errors reported during parsing. this value is
     * incremented each time {@link //notifyErrorListeners} is called.
     */
    _syntaxErrors: number;
    reset(): void;
    /**
     * Match current input symbol against {@code ttype}. If the symbol type
     * matches, {@link ANTLRErrorStrategy//reportMatch} and {@link //consume} are
     * called to complete the match process.
     *
     * <p>If the symbol type does not match,
     * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link //buildParseTree} is
     * {@code true} and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
     *
     * @param ttype the token type to match
     * @return the matched symbol
     * @throws RecognitionException if the current input symbol did not match
     * {@code ttype} and the error strategy could not recover from the
     * mismatched symbol
     */
    match(ttype: any): any;
    /**
     * Match current input symbol as a wildcard. If the symbol type matches
     * (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
     * and {@link //consume} are called to complete the match process.
     *
     * <p>If the symbol type does not match,
     * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
     * strategy to attempt recovery. If {@link //buildParseTree} is
     * {@code true} and the token index of the symbol returned by
     * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
     * the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
     *
     * @return the matched symbol
     * @throws RecognitionException if the current input symbol did not match
     * a wildcard and the error strategy could not recover from the mismatched
     * symbol
     */
    matchWildcard(): any;
    getParseListeners(): any[];
    /**
     * Registers {@code listener} to receive events during the parsing process.
     *
     * <p>To support output-preserving grammar transformations (including but not
     * limited to left-recursion removal, automated left-factoring, and
     * optimized code generation), calls to listener methods during the parse
     * may differ substantially from calls made by
     * {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
     * particular, rule entry and exit events may occur in a different order
     * during the parse than after the parser. In addition, calls to certain
     * rule entry methods may be omitted.</p>
     *
     * <p>With the following specific exceptions, calls to listener events are
     * <em>deterministic</em>, i.e. for identical input the calls to listener
     * methods will be the same.</p>
     *
     * <ul>
     * <li>Alterations to the grammar used to generate code may change the
     * behavior of the listener calls.</li>
     * <li>Alterations to the command line options passed to ANTLR 4 when
     * generating the parser may change the behavior of the listener calls.</li>
     * <li>Changing the version of the ANTLR Tool used to generate the parser
     * may change the behavior of the listener calls.</li>
     * </ul>
     *
     * @param listener the listener to add
     *
     * @throws NullPointerException if {@code} listener is {@code null}
     */
    addParseListener(listener: any): void;
    /**
     * Remove {@code listener} from the list of parse listeners.
     *
     * <p>If {@code listener} is {@code null} or has not been added as a parse
     * listener, this method does nothing.</p>
     * @param listener the listener to remove
     */
    removeParseListener(listener: any): void;
    removeParseListeners(): void;
    triggerEnterRuleEvent(): void;
    /**
     * Notify any parse listeners of an exit rule event.
     * @see //addParseListener
     */
    triggerExitRuleEvent(): void;
    getTokenFactory(): any;
    setTokenFactory(factory: any): void;
    /**
     * The ATN with bypass alternatives is expensive to create so we create it
     * lazily.
     *
     * @throws UnsupportedOperationException if the current parser does not
     * implement the {@link //getSerializedATN()} method.
     */
    getATNWithBypassAlts(): any;
    getInputStream(): any;
    setInputStream(input: any): void;
    getTokenStream(): any;
    setTokenStream(input: any): void;
    /**
     * Match needs to return the current input symbol, which gets put
     * into the label for the associated token ref; e.g., x=ID.
     */
    getCurrentToken(): any;
    notifyErrorListeners(msg: any, offendingToken: any, err: any): void;
    /**
     * Consume and return the {@linkplain //getCurrentToken current symbol}.
     *
     * <p>E.g., given the following input with {@code A} being the current
     * lookahead symbol, this function moves the cursor to {@code B} and returns
     * {@code A}.</p>
     *
     * <pre>
     * A B
     * ^
     * </pre>
     *
     * If the parser is not in error recovery mode, the consumed symbol is added
     * to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
     * {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
     * If the parser <em>is</em> in error recovery mode, the consumed symbol is
     * added to the parse tree using
     * {@link ParserRuleContext//addErrorNode(Token)}, and
     * {@link ParseTreeListener//visitErrorNode} is called on any parse
     * listeners.
     */
    consume(): any;
    addContextToParseTree(): void;
    /**
     * Always called by generated parsers upon entry to a rule. Access field
     * {@link //_ctx} get the current context.
     */
    enterRule(localctx: any, state: any, ruleIndex: any): void;
    state: any;
    exitRule(): void;
    enterOuterAlt(localctx: any, altNum: any): void;
    /**
     * Get the precedence level for the top-most precedence rule.
     *
     * @return The precedence level for the top-most precedence rule, or -1 if
     * the parser context is not nested within a precedence rule.
     */
    getPrecedence(): number;
    enterRecursionRule(localctx: any, state: any, ruleIndex: any, precedence: any): void;
    pushNewRecursionContext(localctx: any, state: any, ruleIndex: any): void;
    unrollRecursionContexts(parentCtx: any): void;
    getInvokingContext(ruleIndex: any): any;
    precpred(localctx: any, precedence: any): boolean;
    inContext(context: any): boolean;
    /**
     * Checks whether or not {@code symbol} can follow the current state in the
     * ATN. The behavior of this method is equivalent to the following, but is
     * implemented such that the complete context-sensitive follow set does not
     * need to be explicitly constructed.
     *
     * <pre>
     * return getExpectedTokens().contains(symbol);
     * </pre>
     *
     * @param symbol the symbol type to check
     * @return {@code true} if {@code symbol} can follow the current state in
     * the ATN, otherwise {@code false}.
     */
    isExpectedToken(symbol: any): any;
    /**
     * Computes the set of input symbols which could follow the current parser
     * state and context, as given by {@link //getState} and {@link //getContext},
     * respectively.
     *
     * @see ATN//getExpectedTokens(int, RuleContext)
     */
    getExpectedTokens(): any;
    getExpectedTokensWithinCurrentRule(): any;
    getRuleIndex(ruleName: any): any;
    /**
     * Return List&lt;String&gt; of the rule names in your parser instance
     * leading up to a call to the current rule. You could override if
     * you want more details such as the file/line info of where
     * in the ATN a rule is invoked.
     *
     * this is very useful for error messages.
     */
    getRuleInvocationStack(p: any): any[];
    getDFAStrings(): any;
    dumpDFA(): void;
    getSourceName(): any;
    /**
     * During a parse is sometimes useful to listen in on the rule entry and exit
     * events as well as token matches. this is for quick and dirty debugging.
     */
    setTrace(trace: any): void;
}
declare namespace Parser {
    const bypassAltsAtnCache: {};
}
