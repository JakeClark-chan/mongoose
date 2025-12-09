export default PredictionMode;
declare namespace PredictionMode {
    const SLL: number;
    const LL: number;
    const LL_EXACT_AMBIG_DETECTION: number;
    function hasSLLConflictTerminatingPrediction(mode: any, configs: any): any;
    function hasConfigInRuleStopState(configs: any): any;
    function allConfigsInRuleStopStates(configs: any): any;
    function resolvesToJustOneViableAlt(altsets: any): any;
    function allSubsetsConflict(altsets: any): any;
    function hasNonConflictingAltSet(altsets: any): any;
    function hasConflictingAltSet(altsets: any): any;
    function allSubsetsEqual(altsets: any): any;
    function getUniqueAlt(altsets: any): number;
    function getAlts(altsets: any): BitSet;
    function getConflictingAltSubsets(configs: any): any[];
    function getStateToAltMap(configs: any): AltDict;
    function hasStateAssociatedWithOneAlt(configs: any): boolean;
    function getSingleViableAlt(altsets: any): any;
}
import BitSet from "../misc/BitSet.js";
import AltDict from "../misc/AltDict.js";
