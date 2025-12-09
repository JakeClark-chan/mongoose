export const __esModule: boolean;
export default ErrorStrategy;
declare class ErrorStrategy {
    reset(recognizer: any): void;
    recoverInline(recognizer: any): void;
    recover(recognizer: any, e: any): void;
    sync(recognizer: any): void;
    inErrorRecoveryMode(recognizer: any): void;
    reportError(recognizer: any): void;
}
