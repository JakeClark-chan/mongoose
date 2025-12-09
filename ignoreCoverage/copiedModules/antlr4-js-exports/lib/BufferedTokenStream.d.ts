export const __esModule: boolean;
export default BufferedTokenStream;
declare const BufferedTokenStream_base: any;
/**
 * This implementation of {@link TokenStream} loads tokens from a
 * {@link TokenSource} on-demand, and places the tokens in a buffer to provide
 * access to any previous token by index.
 *
 * <p>
 * This token stream ignores the value of {@link Token//getChannel}. If your
 * parser requires the token stream filter tokens to only those on a particular
 * channel, such as {@link Token//DEFAULT_CHANNEL} or
 * {@link Token//HIDDEN_CHANNEL}, use a filtering token stream such a
 * {@link CommonTokenStream}.</p>
 */
declare class BufferedTokenStream extends BufferedTokenStream_base {
    [x: string]: any;
    constructor(tokenSource: any);
    tokenSource: any;
    /**
     * A collection of all tokens fetched from the token source. The list is
     * considered a complete view of the input once {@link //fetchedEOF} is set
     * to {@code true}.
     */
    tokens: any[];
    /**
     * The index into {@link //tokens} of the current token (next token to
     * {@link //consume}). {@link //tokens}{@code [}{@link //p}{@code ]} should
     * be
     * {@link //LT LT(1)}.
     *
     * <p>This field is set to -1 when the stream is first constructed or when
     * {@link //setTokenSource} is called, indicating that the first token has
     * not yet been fetched from the token source. For additional information,
     * see the documentation of {@link IntStream} for a description of
     * Initializing Methods.</p>
     */
    index: number;
    /**
     * Indicates whether the {@link Token//EOF} token has been fetched from
     * {@link //tokenSource} and added to {@link //tokens}. This field improves
     * performance for the following cases:
     *
     * <ul>
     * <li>{@link //consume}: The lookahead check in {@link //consume} to
     * prevent
     * consuming the EOF symbol is optimized by checking the values of
     * {@link //fetchedEOF} and {@link //p} instead of calling {@link
     * //LA}.</li>
     * <li>{@link //fetch}: The check to prevent adding multiple EOF symbols
     * into
     * {@link //tokens} is trivial with this field.</li>
     * <ul>
     */
    fetchedEOF: boolean;
    mark(): number;
    release(marker: any): void;
    reset(): void;
    seek(index: any): void;
    get(index: any): any;
    consume(): void;
    /**
     * Make sure index {@code i} in tokens has a token.
     *
     * @return {Boolean} {@code true} if a token is located at index {@code i}, otherwise
     * {@code false}.
     * @see //get(int i)
     */
    sync(i: any): boolean;
    /**
     * Add {@code n} elements to buffer.
     *
     * @return {Number} The actual number of elements added to the buffer.
     */
    fetch(n: any): number;
    getTokens(start: any, stop: any, types: any): any[] | null;
    LA(i: any): any;
    LB(k: any): any;
    LT(k: any): any;
    /**
     * Allowed derived classes to modify the behavior of operations which change
     * the current stream position by adjusting the target token index of a seek
     * operation. The default implementation simply returns {@code i}. If an
     * exception is thrown in this method, the current stream index should not be
     * changed.
     *
     * <p>For example, {@link CommonTokenStream} overrides this method to ensure
     * that
     * the seek target is always an on-channel token.</p>
     *
     * @param {Number} i The target token index.
     * @return {Number} The adjusted target token index.
     */
    adjustSeekIndex(i: number): number;
    lazyInit(): void;
    setup(): void;
    setTokenSource(tokenSource: any): void;
    /**
     * Given a starting index, return the index of the next token on channel.
     * Return i if tokens[i] is on channel. Return -1 if there are no tokens
     * on channel between i and EOF.
     */
    nextTokenOnChannel(i: any, channel: any): any;
    /**
     * Given a starting index, return the index of the previous token on channel.
     * Return i if tokens[i] is on channel. Return -1 if there are no tokens
     * on channel between i and 0.
     */
    previousTokenOnChannel(i: any, channel: any): any;
    /**
     * Collect all tokens on specified channel to the right of
     * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
     * EOF. If channel is -1, find any non default channel token.
     */
    getHiddenTokensToRight(tokenIndex: any, channel: any): any[] | null;
    /**
     * Collect all tokens on specified channel to the left of
     * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
     * If channel is -1, find any non default channel token.
     */
    getHiddenTokensToLeft(tokenIndex: any, channel: any): any[] | null;
    filterForChannel(left: any, right: any, channel: any): any[] | null;
    getSourceName(): any;
    getText(interval: any): string;
    fill(): void;
}
declare namespace BufferedTokenStream {
    const size: any;
}
