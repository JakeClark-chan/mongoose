import { MethodParameterTypeContext, MethodTypeContext } from "./../../ParsedTypes";
export declare class JavaParserMethodExtractor {
    output: MethodTypeContext;
    includePosition: boolean;
    constructor(ctx: any, modifierCtx: any, includePosition: boolean);
    custom_getFormalParameterType(ctx: any): any;
    custom_getFormalParameter(ctx: any): MethodParameterTypeContext;
    custom_getFormalParameters(ctx: any): MethodParameterTypeContext[];
    enterMethodDeclaration(ctx: any, modifierCtx: any): MethodTypeContext;
}
