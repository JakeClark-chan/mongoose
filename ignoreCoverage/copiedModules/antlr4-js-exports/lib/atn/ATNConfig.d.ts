export const __esModule: boolean;
export default ATNConfig;
declare class ATNConfig {
    /**
     * @param {Object} params A tuple: (ATN state, predicted alt, syntactic, semantic context).
     * The syntactic context is a graph-structured stack node whose
     * path(s) to the root is the rule invocation(s)
     * chain used to arrive at the state.  The semantic context is
     * the tree of semantic predicates encountered before reaching
     * an ATN state
     */
    constructor(params: any, config: any);
    state: any;
    alt: any;
    /**
     * The stack of invoking states leading to the rule/states associated
     * with this config.  We track only those contexts pushed during
     * execution of the ATN simulator
     */
    context: any;
    semanticContext: any;
    /**
     * We cannot execute predicates dependent upon local context unless
     * we know for sure we are in the correct context. Because there is
     * no way to do this efficiently, we simply cannot evaluate
     * dependent predicates unless we are in the rule that initially
     * invokes the ATN simulator.
     * closure() tracks the depth of how far we dip into the
     * outer context: depth &gt; 0.  Note that it may not be totally
     * accurate depth since I don't ever decrement
     */
    reachesIntoOuterContext: any;
    precedenceFilterSuppressed: any;
    checkContext(params: any, config: any): void;
    hashCode(): any;
    updateHashCode(hash: any): void;
    /**
     * An ATN configuration is equal to another if both have
     * the same state, they predict the same alternative, and
     * syntactic/semantic contexts are the same
     */
    equals(other: any): any;
    hashCodeForConfigSet(): any;
    equalsForConfigSet(other: any): any;
    toString(): string;
}
