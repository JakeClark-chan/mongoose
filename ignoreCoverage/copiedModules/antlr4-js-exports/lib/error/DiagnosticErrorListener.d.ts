export const __esModule: boolean;
export default DiagnosticErrorListener;
declare const DiagnosticErrorListener_base: any;
/**
 * This implementation of {@link ANTLRErrorListener} can be used to identify
 *  certain potential correctness and performance problems in grammars. "Reports"
 *  are made by calling {@link Parser//notifyErrorListeners} with the appropriate
 *  message.
 *
 *  <ul>
 *  <li><b>Ambiguities</b>: These are cases where more than one path through the
 *  grammar can match the input.</li>
 *  <li><b>Weak context sensitivity</b>: These are cases where full-context
 *  prediction resolved an SLL conflict to a unique alternative which equaled the
 *  minimum alternative of the SLL conflict.</li>
 *  <li><b>Strong (forced) context sensitivity</b>: These are cases where the
 *  full-context prediction resolved an SLL conflict to a unique alternative,
 *  <em>and</em> the minimum alternative of the SLL conflict was found to not be
 *  a truly viable alternative. Two-stage parsing cannot be used for inputs where
 *  this situation occurs.</li>
 *  </ul>
 */
declare class DiagnosticErrorListener extends DiagnosticErrorListener_base {
    [x: string]: any;
    constructor(exactOnly: any);
    exactOnly: any;
    reportAmbiguity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, exact: any, ambigAlts: any, configs: any): void;
    reportAttemptingFullContext(recognizer: any, dfa: any, startIndex: any, stopIndex: any, conflictingAlts: any, configs: any): void;
    reportContextSensitivity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, prediction: any, configs: any): void;
    getDecisionDescription(recognizer: any, dfa: any): string;
    /**
     * Computes the set of conflicting or ambiguous alternatives from a
     * configuration set, if that information was not already provided by the
     * parser.
     *
     * @param reportedAlts The set of conflicting or ambiguous alternatives, as
     * reported by the parser.
     * @param configs The conflicting or ambiguous configuration set.
     * @return Returns {@code reportedAlts} if it is not {@code null}, otherwise
     * returns the set of alternatives represented in {@code configs}.
        */
    getConflictingAlts(reportedAlts: any, configs: any): any;
}
