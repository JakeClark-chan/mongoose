export default class RangeTransition extends Transition {
    constructor(target: any, start: any, stop: any);
    serializationType: number;
    start: any;
    stop: any;
    label: IntervalSet;
    makeLabel(): IntervalSet;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
import Transition from "./Transition.js";
import IntervalSet from "../misc/IntervalSet.js";
