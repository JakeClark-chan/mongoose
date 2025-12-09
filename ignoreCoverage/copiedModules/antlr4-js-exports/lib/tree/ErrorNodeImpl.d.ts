export const __esModule: boolean;
export default ErrorNodeImpl;
declare const ErrorNodeImpl_base: any;
/**
 * Represents a token that was consumed during resynchronization
 * rather than during a valid match operation. For example,
 * we will create this kind of a node during single token insertion
 * and deletion as well as during "consume until error recovery set"
 * upon no viable alternative exceptions.
 */
declare class ErrorNodeImpl extends ErrorNodeImpl_base {
    [x: string]: any;
    constructor(token: any);
    isErrorNode(): boolean;
    accept(visitor: any): any;
}
