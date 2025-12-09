export default class SingletonPredictionContext extends PredictionContext {
    static create(parent: any, returnState: any): any;
    constructor(parent: any, returnState: any);
    parentCtx: any;
    returnState: any;
    getParent(index: any): any;
    getReturnState(index: any): any;
    equals(other: any): any;
    get length(): number;
}
import PredictionContext from "./PredictionContext.js";
