"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaParserMethodExtractor = void 0;
const JavaParserHelper_1 = require("./JavaParserHelper");
const ParsedTypes_1 = require("./../../ParsedTypes");
//TODO: check for class/interface declaration inside method declaration --> See anonymous class test case
class JavaParserMethodExtractor {
    constructor(ctx, modifierCtx, includePosition) {
        this.includePosition = includePosition;
        this.output = this.enterMethodDeclaration(ctx, modifierCtx);
    }
    custom_getFormalParameterType(ctx) {
        return ctx.getText();
    }
    custom_getFormalParameter(ctx) {
        /**
         "type": "formalParameter",
         "node": "FormalParameterContext",
         "children": [
         {
                  "type": "typeType",
                  "node": "TypeTypeContext",
                  "children": [
                    {
                      "type": "classOrInterfaceType",
                      "node": "ClassOrInterfaceTypeContext",
                      "children": [
                        {
                          "type": "typeIdentifier",
                          "node": "TypeIdentifierContext",
                          "children": [
                            "List"
         */
        let typeType = ctx.children[0];
        let type = this.custom_getFormalParameterType(typeType);
        let variableDeclaratorId = ctx.children[1];
        let name = variableDeclaratorId.getText();
        let parameter = new ParsedTypes_1.MethodParameterTypeContext(name, name, type);
        if (this.includePosition) {
            parameter.position = JavaParserHelper_1.JavaParserHelper.custom_getPosition(ctx);
        }
        return parameter;
    }
    custom_getFormalParameters(ctx) {
        /**
         "type": "formalParameters",
         "node": "FormalParametersContext",
         "children": [
         "(",
         {
          "type": "formalParameterList",
          "node": "FormalParameterListContext",
         */
        let parameters = [];
        if (ctx.children.length >= 3) { // has parameters: [ "(", formalParameterList, ")" ]
            let formalParameterList = ctx.children[1];
            for (let i = 0; i < formalParameterList.children.length; i++) {
                let formalParameter = formalParameterList.children[i];
                if (formalParameter.getText() === ",") {
                    // skip
                }
                else {
                    let parameter = this.custom_getFormalParameter(formalParameter);
                    // @ts-ignore
                    parameters.push(parameter);
                }
            }
        }
        return parameters;
    }
    enterMethodDeclaration(ctx, modifierCtx) {
        // get visibility from parent
        let modifiers = JavaParserHelper_1.JavaParserHelper.getModifiers(modifierCtx);
        //method["position"] = custom_getPosition(ctx.parentCtx.parentCtx);
        // get method name
        let methodName = ctx.children[1].getText();
        let formalParameters = ctx.children[2];
        let parameters = this.custom_getFormalParameters(formalParameters);
        let methodSignature = methodName + "(" + parameters.map(p => p.type).join(",") + ")";
        let method = new ParsedTypes_1.MethodTypeContext(methodSignature, methodName, modifiers);
        // get return type
        let returnType = ctx.children[0].getText();
        method.returnType = returnType;
        // get visibility
        method.parameters = parameters;
        if (this.includePosition) {
            method.position = JavaParserHelper_1.JavaParserHelper.custom_getPosition(ctx);
        }
        // @ts-ignore
        return method;
    }
}
exports.JavaParserMethodExtractor = JavaParserMethodExtractor;
