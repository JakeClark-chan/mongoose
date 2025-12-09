export const __esModule: boolean;
export default RuleContext;
declare const RuleContext_base: any;
declare class RuleContext extends RuleContext_base {
    [x: string]: any;
    /** A rule context is a record of a single rule invocation. It knows
     * which context invoked it, if any. If there is no parent context, then
     * naturally the invoking state is not valid.  The parent link
     * provides a chain upwards from the current rule invocation to the root
     * of the invocation tree, forming a stack. We actually carry no
     * information about the rule associated with this context (except
     * when parsing). We keep only the state number of the invoking state from
     * the ATN submachine that invoked this. Contrast this with the s
     * pointer inside ParserRuleContext that tracks the current state
     * being "executed" for the current rule.
     *
     * The parent contexts are useful for computing lookahead sets and
     * getting error information.
     *
     * These objects are used during parsing and prediction.
     * For the special case of parsers, we use the subclass
     * ParserRuleContext.
     *
     * @see ParserRuleContext
     */
    constructor(parent: any, invokingState: any);
    parentCtx: any;
    /**
     * What state invoked the rule associated with this context?
     * The "return address" is the followState of invokingState
     * If parent is null, this should be -1.
     */
    invokingState: any;
    depth(): number;
    /**
     * A context is empty if there is no invoking state; meaning nobody call
     * current context.
     */
    isEmpty(): boolean;
    getSourceInterval(): any;
    get ruleContext(): RuleContext;
    getPayload(): RuleContext;
    /**
     * Return the combined text of all child nodes. This method only considers
     * tokens which have been added to the parse tree.
     * <p>
     * Since tokens on hidden channels (e.g. whitespace or comments) are not
     * added to the parse trees, they will not appear in the output of this
     * method.
     */
    getText(): any;
    /**
     * For rule associated with this parse tree internal node, return
     * the outer alternative number used to match the input. Default
     * implementation does not compute nor store this alt num. Create
     * a subclass of ParserRuleContext with backing field and set
     * option contextSuperClass.
     * to set it.
     */
    getAltNumber(): number;
    /**
     * Set the outer alternative number for this context node. Default
     * implementation does nothing to avoid backing field overhead for
     * trees that don't need it.  Create
     * a subclass of ParserRuleContext with backing field and set
     * option contextSuperClass.
     */
    setAltNumber(altNumber: any): void;
    getChild(i: any): null;
    getChildCount(): number;
    accept(visitor: any): any;
    /**
     * Print out a whole tree, not just a node, in LISP format
     * (root child1 .. childN). Print just a node if this is a leaf.
     */
    toStringTree(ruleNames: any, recog: any): any;
    toString(ruleNames: any, stop: any): string;
}
