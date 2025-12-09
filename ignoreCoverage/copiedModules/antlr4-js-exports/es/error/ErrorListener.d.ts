/**
 * Provides an empty default implementation of {@link ANTLRErrorListener}. The
 * default implementation of each method does nothing, but can be overridden as
 * necessary.
 */
export default class ErrorListener {
    syntaxError(recognizer: any, offendingSymbol: any, line: any, column: any, msg: any, e: any): void;
    reportAmbiguity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, exact: any, ambigAlts: any, configs: any): void;
    reportAttemptingFullContext(recognizer: any, dfa: any, startIndex: any, stopIndex: any, conflictingAlts: any, configs: any): void;
    reportContextSensitivity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, prediction: any, configs: any): void;
}
