export const __esModule: boolean;
export default TraceListener;
declare const TraceListener_base: any;
declare class TraceListener extends TraceListener_base {
    [x: string]: any;
    constructor(parser: any);
    parser: any;
    enterEveryRule(ctx: any): void;
    visitTerminal(node: any): void;
    exitEveryRule(ctx: any): void;
}
