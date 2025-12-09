declare class PredictionContext {
    constructor(cachedHashCode: any);
    cachedHashCode: any;
    /**
     * Stores the computed hash code of this {@link PredictionContext}. The hash
     * code is computed in parts to match the following reference algorithm.
     *
     * <pre>
     * private int referenceHashCode() {
     * int hash = {@link MurmurHash//initialize MurmurHash.initialize}({@link
     * //INITIAL_HASH});
     *
     * for (int i = 0; i &lt; {@link //size()}; i++) {
     * hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link //getParent
     * getParent}(i));
     * }
     *
     * for (int i = 0; i &lt; {@link //size()}; i++) {
     * hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link
     * //getReturnState getReturnState}(i));
     * }
     *
     * hash = {@link MurmurHash//finish MurmurHash.finish}(hash, 2// {@link
     * //size()});
     * return hash;
     * }
     * </pre>
     * This means only the {@link //EMPTY} context is in set.
     */
    isEmpty(): boolean;
    hasEmptyPath(): boolean;
    hashCode(): any;
    updateHashCode(hash: any): void;
}
declare namespace PredictionContext {
    export const EMPTY: any;
    export const EMPTY_RETURN_STATE: number;
    export const globalNodeCount: number;
    import id = globalNodeCount;
    export { id };
    export const trace_atn_sim: boolean;
}
export default PredictionContext;
