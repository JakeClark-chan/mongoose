/**
 * Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
 * Return {@link //EMPTY} if {@code outerContext} is empty or null.
 */
export function predictionContextFromRuleContext(atn: any, outerContext: any): any;
export function getCachedPredictionContext(context: any, contextCache: any, visited: any): any;
export function merge(a: any, b: any, rootIsWildcard: any, mergeCache: any): any;
export function getAllContextNodes(context: any, nodes: any, visited: any): any;
