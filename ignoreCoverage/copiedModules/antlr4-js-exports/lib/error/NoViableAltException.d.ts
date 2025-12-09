export const __esModule: boolean;
export default NoViableAltException;
declare const NoViableAltException_base: any;
/**
 * Indicates that the parser could not decide which of two or more paths
 * to take based upon the remaining input. It tracks the starting token
 * of the offending input and also knows where the parser was
 * in the various paths when the error. Reported by reportNoViableAlternative()
 */
declare class NoViableAltException extends NoViableAltException_base {
    [x: string]: any;
    constructor(recognizer: any, input: any, startToken: any, offendingToken: any, deadEndConfigs: any, ctx: any);
    deadEndConfigs: any;
    startToken: any;
    offendingToken: any;
}
