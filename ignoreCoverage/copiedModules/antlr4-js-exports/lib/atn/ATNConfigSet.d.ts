export const __esModule: boolean;
export default ATNConfigSet;
/**
 * Specialized {@link Set}{@code <}{@link ATNConfig}{@code >} that can track
 * info about the set, with support for combining similar configurations using a
 * graph-structured stack
 */
declare class ATNConfigSet {
    constructor(fullCtx: any);
    /**
     * The reason that we need this is because we don't want the hash map to use
     * the standard hash code and equals. We need all configurations with the
     * same
     * {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
     * doubles
     * the number of objects associated with ATNConfigs. The other solution is
     * to
     * use a hash table that lets us specify the equals/hashcode operation.
     * All configs but hashed by (s, i, _, pi) not including context. Wiped out
     * when we go readonly as this set becomes a DFA state
     */
    configLookup: any;
    /**
     * Indicates that this configuration set is part of a full context
     * LL prediction. It will be used to determine how to merge $. With SLL
     * it's a wildcard whereas it is not for LL context merge
     */
    fullCtx: any;
    /**
     * Indicates that the set of configurations is read-only. Do not
     * allow any code to manipulate the set; DFA states will point at
     * the sets and they must not change. This does not protect the other
     * fields; in particular, conflictingAlts is set after
     * we've made this readonly
     */
    readOnly: boolean;
    configs: any[];
    uniqueAlt: number;
    conflictingAlts: any;
    /**
     * Used in parser and lexer. In lexer, it indicates we hit a pred
     * while computing a closure operation. Don't make a DFA state from this
     */
    hasSemanticContext: boolean;
    dipsIntoOuterContext: boolean;
    cachedHashCode: number;
    /**
     * Adding a new config means merging contexts with existing configs for
     * {@code (s, i, pi, _)}, where {@code s} is the
     * {@link ATNConfig//state}, {@code i} is the {@link ATNConfig//alt}, and
     * {@code pi} is the {@link ATNConfig//semanticContext}. We use
     * {@code (s,i,pi)} as key.
     *
     * <p>This method updates {@link //dipsIntoOuterContext} and
     * {@link //hasSemanticContext} when necessary.</p>
     */
    add(config: any, mergeCache: any): boolean;
    getStates(): any;
    getPredicates(): any[];
    optimizeConfigs(interpreter: any): void;
    addAll(coll: any): boolean;
    equals(other: any): any;
    hashCode(): any;
    updateHashCode(hash: any): void;
    isEmpty(): boolean;
    contains(item: any): any;
    containsFast(item: any): any;
    clear(): void;
    setReadonly(readOnly: any): void;
    toString(): string;
    get items(): any[];
    get length(): number;
}
