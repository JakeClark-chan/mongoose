export default class EpsilonTransition extends Transition {
    constructor(target: any, outermostPrecedenceReturn: any);
    serializationType: number;
    outermostPrecedenceReturn: any;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
import Transition from "./Transition.js";
