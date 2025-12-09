"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaParserFieldExtractor = void 0;
const JavaParserHelper_1 = require("./JavaParserHelper");
const ParsedTypes_1 = require("./../../ParsedTypes");
class JavaParserFieldExtractor {
    constructor(ctx, includePosition) {
        this.includePosition = includePosition;
        let field = this.enterFieldDeclaration(ctx);
        this.field = field;
    }
    custom_getFieldType(ctx) {
        return ctx.getText();
    }
    enterFieldDeclaration(ctx) {
        /**
         "type": "modifier",
         "node": "ModifierContext",
         "children": [
         {
                          "type": "classOrInterfaceModifier",
                          "node": "ClassOrInterfaceModifierContext",
                          "children": [
                            "static"
                          ]
                        }
         ]
         },
         {
                      "type": "memberDeclaration",
                      "node": "MemberDeclarationContext",
                      "children": [
                        {
                          "type": "fieldDeclaration",
                          "node": "FieldDeclarationContext",
                          "children": [
                            {
                              "type": "typeType",
                              "node": "TypeTypeContext",
         */
        let modifiers = JavaParserHelper_1.JavaParserHelper.getModifiers(ctx.parentCtx.parentCtx);
        let type = this.custom_getFieldType(ctx.children[0]);
        let position = undefined;
        if (this.includePosition) {
            position = JavaParserHelper_1.JavaParserHelper.custom_getPosition(ctx);
        }
        let variableDeclarators = ctx.children[1]; // for example: int a, b, c;
        let parameters = [];
        for (let i = 0; i < variableDeclarators.children.length; i++) { // loop through a, b, c
            let variableDeclarator = variableDeclarators.children[i];
            if (variableDeclarator.getText() === ",") {
                // skip the comma
            }
            else {
                let variableName = variableDeclarator.children[0].getText(); // get the name of the variable
                let parameter = new ParsedTypes_1.MemberFieldTypeContext(variableName, variableName, type);
                parameters.push(parameter);
            }
        }
        // names as a string
        let namesAsString = "";
        for (let i = 0; i < parameters.length; i++) {
            let parameter = parameters[i];
            namesAsString += parameter.name;
            if (i < parameters.length - 1) {
                namesAsString += ",";
            }
        }
        let key = namesAsString;
        let name = key;
        let field = new ParsedTypes_1.MemberFieldTypeContext(key, name, type);
        field.modifiers = modifiers;
        field.position = position;
        field.parameters = parameters;
        return field;
    }
}
exports.JavaParserFieldExtractor = JavaParserFieldExtractor;
