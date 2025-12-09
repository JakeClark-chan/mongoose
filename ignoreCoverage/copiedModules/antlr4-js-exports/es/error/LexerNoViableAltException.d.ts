export default class LexerNoViableAltException extends RecognitionException {
    constructor(lexer: any, input: any, startIndex: any, deadEndConfigs: any);
    startIndex: any;
    deadEndConfigs: any;
    toString(): string;
}
import RecognitionException from "./RecognitionException.js";
