/**
 * This default implementation of {@link TokenFactory} creates
 * {@link CommonToken} objects.
 */
declare class CommonTokenFactory extends TokenFactory {
    constructor(copyText: any);
    /**
     * Indicates whether {@link CommonToken//setText} should be called after
     * constructing tokens to explicitly set the text. This is useful for cases
     * where the input stream might not be able to provide arbitrary substrings
     * of text from the input after the lexer creates a token (e.g. the
     * implementation of {@link CharStream//getText} in
     * {@link UnbufferedCharStream} throws an
     * {@link UnsupportedOperationException}). Explicitly setting the token text
     * allows {@link Token//getText} to be called at any time regardless of the
     * input stream implementation.
     *
     * <p>
     * The default value is {@code false} to avoid the performance and memory
     * overhead of copying text for every token unless explicitly requested.</p>
     */
    copyText: any;
    create(source: any, type: any, text: any, channel: any, start: any, stop: any, line: any, column: any): CommonToken;
    createThin(type: any, text: any): CommonToken;
}
declare namespace CommonTokenFactory {
    const DEFAULT: CommonTokenFactory;
}
export default CommonTokenFactory;
declare class TokenFactory {
}
import CommonToken from "./CommonToken.js";
