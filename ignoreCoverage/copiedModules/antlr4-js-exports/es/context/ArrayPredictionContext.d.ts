export default class ArrayPredictionContext extends PredictionContext {
    constructor(parents: any, returnStates: any);
    parents: any;
    returnStates: any;
    getParent(index: any): any;
    getReturnState(index: any): any;
    equals(other: any): boolean;
    get length(): any;
}
import PredictionContext from "./PredictionContext.js";
