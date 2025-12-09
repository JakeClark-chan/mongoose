export const __esModule: boolean;
export default RuleStopState;
declare const RuleStopState_base: any;
/**
 * The last node in the ATN for a rule, unless that rule is the start symbol.
 * In that case, there is one transition to EOF. Later, we might encode
 * references to all calls to this rule to compute FOLLOW sets for
 * error handling
 */
declare class RuleStopState extends RuleStopState_base {
    [x: string]: any;
    stateType: any;
}
