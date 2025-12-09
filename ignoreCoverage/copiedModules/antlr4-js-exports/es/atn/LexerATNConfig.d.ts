export default class LexerATNConfig extends ATNConfig {
    constructor(params: any, config: any);
    lexerActionExecutor: any;
    passedThroughNonGreedyDecision: any;
    checkNonGreedyDecision(source: any, target: any): any;
}
import ATNConfig from "./ATNConfig.js";
