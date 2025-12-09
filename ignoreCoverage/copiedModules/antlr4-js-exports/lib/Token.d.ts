export const __esModule: boolean;
export default Token;
/**
 * A token has properties: text, type, line, character position in the line
 * (so we can ignore tabs), token channel, index, and source from which
 * we obtained this token.
 */
declare class Token {
    source: any;
    type: any;
    channel: any;
    start: any;
    stop: any;
    tokenIndex: any;
    line: any;
    column: any;
    _text: any;
    getTokenSource(): any;
    getInputStream(): any;
    set text(arg: any);
    get text(): any;
}
declare namespace Token {
    const INVALID_TYPE: number;
    const EPSILON: number;
    const MIN_USER_TOKEN_TYPE: number;
    const EOF: number;
    const DEFAULT_CHANNEL: number;
    const HIDDEN_CHANNEL: number;
}
