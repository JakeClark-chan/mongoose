export default class ParseTreeListener {
    visitTerminal(node: any): void;
    visitErrorNode(node: any): void;
    enterEveryRule(node: any): void;
    exitEveryRule(node: any): void;
}
