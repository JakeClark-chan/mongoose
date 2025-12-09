export default class WildcardTransition extends Transition {
    serializationType: number;
    matches(symbol: any, minVocabSymbol: any, maxVocabSymbol: any): boolean;
}
import Transition from "./Transition.js";
