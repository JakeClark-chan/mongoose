export const __esModule: boolean;
export default SingletonPredictionContext;
declare const SingletonPredictionContext_base: any;
declare class SingletonPredictionContext extends SingletonPredictionContext_base {
    [x: string]: any;
    static create(parent: any, returnState: any): any;
    constructor(parent: any, returnState: any);
    parentCtx: any;
    returnState: any;
    getParent(index: any): any;
    getReturnState(index: any): any;
    equals(other: any): any;
    toString(): string;
    get length(): number;
}
