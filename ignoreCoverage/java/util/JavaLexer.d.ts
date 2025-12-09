import { antlr4 } from "../../util/MyAntlr4";
export default class JavaLexer extends antlr4.Lexer {
    static grammarFileName: string;
    static channelNames: string[];
    static modeNames: string[];
    static literalNames: (string | null)[];
    static symbolicNames: (string | null)[];
    static ruleNames: string[];
    constructor(input: any);
}
