export const __esModule: boolean;
export default ConsoleErrorListener;
declare const ConsoleErrorListener_base: any;
/**
 * {@inheritDoc}
 *
 * <p>
 * This implementation prints messages to {@link System//err} containing the
 * values of {@code line}, {@code charPositionInLine}, and {@code msg} using
 * the following format.</p>
 *
 * <pre>
 * line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
 * </pre>
 *
 */
declare class ConsoleErrorListener extends ConsoleErrorListener_base {
    [x: string]: any;
    syntaxError(recognizer: any, offendingSymbol: any, line: any, column: any, msg: any, e: any): void;
}
declare namespace ConsoleErrorListener {
    const INSTANCE: ConsoleErrorListener;
}
