/**
 * A rule invocation record for parsing.
 *
 *  Contains all of the information about the current rule not stored in the
 *  RuleContext. It handles parse tree children list, Any ATN state
 *  tracing, and the default values available for rule indications:
 *  start, stop, rule index, current alt number, current
 *  ATN state.
 *
 *  Subclasses made for each rule and grammar track the parameters,
 *  return values, locals, and labels specific to that rule. These
 *  are the objects that are returned from rules.
 *
 *  Note text is not an actual field of a rule return value; it is computed
 *  from start and stop using the input stream's toString() method.  I
 *  could add a ctor to this so that we can pass in and store the input
 *  stream, but I'm not sure we want to do that.  It would seem to be undefined
 *  to get the .text property anyway if the rule matches tokens from multiple
 *  input streams.
 *
 *  I do not use getters for fields of objects that are used simply to
 *  group values such as this aggregate.  The getters/setters are there to
 *  satisfy the superclass interface.
 */
export default class ParserRuleContext extends RuleContext {
    /**
     * If we are debugging or building a parse tree for a visitor,
     * we need to track all of the tokens and rule invocations associated
     * with this rule's context. This is empty for parsing w/o tree constr.
     * operation because we don't the need to track the details about
     * how we parse this rule.
     */
    children: any[] | null;
    start: any;
    stop: any;
    /**
     * The exception that forced this rule to return. If the rule successfully
     * completed, this is {@code null}.
     */
    exception: any;
    copyFrom(ctx: any): void;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
    addChild(child: any): any;
    /** Used by enterOuterAlt to toss out a RuleContext previously added as
     * we entered a rule. If we have // label, we will need to remove
     * generic ruleContext object.
     */
    removeLastChild(): void;
    addTokenNode(token: any): TerminalNodeImpl;
    addErrorNode(badToken: any): ErrorNodeImpl;
    getChild(i: any, type: any): any;
    getToken(ttype: any, i: any): TerminalNode | null;
    getTokens(ttype: any): TerminalNode[];
    getTypedRuleContext(ctxType: any, i: any): any;
    getTypedRuleContexts(ctxType: any): any[];
}
import RuleContext from "./RuleContext.js";
import TerminalNodeImpl from "../tree/TerminalNodeImpl.js";
import ErrorNodeImpl from "../tree/ErrorNodeImpl.js";
import TerminalNode from "../tree/TerminalNode.js";
