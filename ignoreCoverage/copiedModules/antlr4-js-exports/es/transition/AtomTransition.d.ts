export default class AtomTransition extends Transition {
    constructor(target: any, label: any);
    label_: any;
    label: IntervalSet;
    serializationType: number;
    makeLabel(): IntervalSet;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
    toString(): any;
}
import Transition from "./Transition.js";
import IntervalSet from "../misc/IntervalSet.js";
