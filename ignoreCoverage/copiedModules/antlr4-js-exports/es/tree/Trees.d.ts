export default Trees;
declare namespace Trees {
    function toStringTree(tree: any, ruleNames: any, recog: any): any;
    function getNodeText(t: any, ruleNames: any, recog: any): any;
    function getChildren(t: any): any[];
    function getAncestors(t: any): any[];
    function findAllTokenNodes(t: any, ttype: any): any[];
    function findAllRuleNodes(t: any, ruleIndex: any): any[];
    function findAllNodes(t: any, index: any, findTokens: any): any[];
    function _findAllNodes(t: any, index: any, findTokens: any, nodes: any): void;
    function descendants(t: any): any[];
}
