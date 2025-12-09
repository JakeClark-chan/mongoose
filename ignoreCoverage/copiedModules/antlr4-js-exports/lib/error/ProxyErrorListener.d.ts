export const __esModule: boolean;
export default ProxyErrorListener;
declare const ProxyErrorListener_base: any;
declare class ProxyErrorListener extends ProxyErrorListener_base {
    [x: string]: any;
    constructor(delegates: any);
    delegates: any;
    syntaxError(recognizer: any, offendingSymbol: any, line: any, column: any, msg: any, e: any): void;
    reportAmbiguity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, exact: any, ambigAlts: any, configs: any): void;
    reportAttemptingFullContext(recognizer: any, dfa: any, startIndex: any, stopIndex: any, conflictingAlts: any, configs: any): void;
    reportContextSensitivity(recognizer: any, dfa: any, startIndex: any, stopIndex: any, prediction: any, configs: any): void;
}
