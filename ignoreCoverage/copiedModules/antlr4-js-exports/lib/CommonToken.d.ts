export const __esModule: boolean;
export default CommonToken;
declare const CommonToken_base: any;
declare class CommonToken extends CommonToken_base {
    [x: string]: any;
    constructor(source: any, type: any, channel: any, start: any, stop: any);
    source: any;
    type: any;
    channel: any;
    start: any;
    stop: any;
    tokenIndex: number;
    line: any;
    column: any;
    /**
     * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
     *
     * <p>
     * If {@code oldToken} is also a {@link CommonToken} instance, the newly
     * constructed token will share a reference to the {@link //text} field and
     * the {@link Pair} stored in {@link //source}. Otherwise, {@link //text} will
     * be assigned the result of calling {@link //getText}, and {@link //source}
     * will be constructed from the result of {@link Token//getTokenSource} and
     * {@link Token//getInputStream}.</p>
     *
     * @param oldToken The token to copy.
     */
    clone(): CommonToken;
    cloneWithType(type: any): CommonToken;
    toString(): string;
    set text(arg: any);
    get text(): any;
    _text: any;
}
declare namespace CommonToken {
    const EMPTY_SOURCE: null[];
}
