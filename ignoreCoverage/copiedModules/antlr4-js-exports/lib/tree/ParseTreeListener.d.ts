export const __esModule: boolean;
export default ParseTreeListener;
declare class ParseTreeListener {
    visitTerminal(node: any): void;
    visitErrorNode(node: any): void;
    enterEveryRule(node: any): void;
    exitEveryRule(node: any): void;
}
