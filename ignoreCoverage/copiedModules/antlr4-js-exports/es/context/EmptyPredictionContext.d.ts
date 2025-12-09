export default class EmptyPredictionContext extends SingletonPredictionContext {
    constructor();
    getParent(index: any): null;
    equals(other: any): boolean;
}
import SingletonPredictionContext from "./SingletonPredictionContext.js";
