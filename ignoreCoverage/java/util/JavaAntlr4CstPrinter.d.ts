import JavaParserListener from "./JavaParserListener";
export declare class JavaAntlr4CstPrinter extends JavaParserListener {
    static print(ctx: any, key: any): void;
    buildAST(tree: any, ruleNames: any): any;
}
