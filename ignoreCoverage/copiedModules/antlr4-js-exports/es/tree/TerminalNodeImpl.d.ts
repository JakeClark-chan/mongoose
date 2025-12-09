export default class TerminalNodeImpl extends TerminalNode {
    constructor(symbol: any);
    parentCtx: any;
    symbol: any;
    getChild(i: any): null;
    getSymbol(): any;
    getParent(): any;
    getPayload(): any;
    getSourceInterval(): Interval;
    getChildCount(): number;
    accept(visitor: any): any;
    getText(): any;
    toString(): any;
}
import TerminalNode from "./TerminalNode.js";
import Interval from "../misc/Interval.js";
