export const __esModule: boolean;
export default TerminalNodeImpl;
declare const TerminalNodeImpl_base: any;
declare class TerminalNodeImpl extends TerminalNodeImpl_base {
    [x: string]: any;
    constructor(symbol: any);
    parentCtx: any;
    symbol: any;
    getChild(i: any): null;
    getSymbol(): any;
    getParent(): any;
    getPayload(): any;
    getSourceInterval(): any;
    getChildCount(): number;
    accept(visitor: any): any;
    getText(): any;
    toString(): any;
}
