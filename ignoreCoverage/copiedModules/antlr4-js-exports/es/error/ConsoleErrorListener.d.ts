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
declare class ConsoleErrorListener extends ErrorListener {
}
declare namespace ConsoleErrorListener {
    const INSTANCE: ConsoleErrorListener;
}
export default ConsoleErrorListener;
import ErrorListener from "./ErrorListener.js";
