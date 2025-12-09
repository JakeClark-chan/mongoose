"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaParserAntlr4 = void 0;
const JavaLexer_1 = __importDefault(require("./../../java/util/JavaLexer"));
const JavaParser_1 = __importDefault(require("./../../java/util/JavaParser"));
const MyAntlr4_1 = require("./../../util/MyAntlr4");
const JavaParserHelper_1 = require("./JavaParserHelper");
const JavaParserFieldExtractor_1 = require("./JavaParserFieldExtractor");
const JavaParserMethodExtractor_1 = require("./JavaParserMethodExtractor");
const ParsedTypes_1 = require("./../../ParsedTypes");
const JavaAntlr4CstPrinter_1 = require("../util/JavaAntlr4CstPrinter");
//TODO add support for generics
class BaseExtractor {
    constructor(path, ctx, type, includePosition = false, innerClassOrInterface = false) {
        this.includePosition = includePosition;
        //        let type = ctx.children[0]; // "class" or "interface"
        //      this.output["type"] = type;
        let identifier = JavaParserHelper_1.JavaParserHelper.getChildByType(ctx, "identifier");
        // @ts-ignore
        let className = identifier.getText();
        let key = path + "/" + className;
        this.output = new ParsedTypes_1.ClassOrInterfaceTypeContext(key, className, type);
        let modifiers = [];
        if (!innerClassOrInterface) {
            modifiers = JavaParserHelper_1.JavaParserHelper.getModifiers(ctx.parentCtx);
        }
        if (innerClassOrInterface) {
            modifiers = JavaParserHelper_1.JavaParserHelper.getModifiers(ctx.parentCtx.parentCtx);
        }
        this.output.modifiers = modifiers;
        if (this.includePosition) {
            this.output.position = JavaParserHelper_1.JavaParserHelper.custom_getPosition(ctx.parentCtx);
        }
    }
    extractClassOrInterfaceFromMember(memberDeclarationCtx) {
        let interfaceDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(memberDeclarationCtx, "interfaceDeclaration");
        if (interfaceDeclaration !== null) {
            let interfaceExtractor = new InterfaceExtractor(interfaceDeclaration, this.includePosition, true);
            let innerInterfaceOutput = interfaceExtractor.output;
            let key = innerInterfaceOutput.key;
            this.output.interfaces[key] = innerInterfaceOutput;
        }
        let classDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(memberDeclarationCtx, "classDeclaration");
        if (classDeclaration !== null) {
            let classListener = new ClassExtractor(classDeclaration, this.includePosition, true);
            let innerClassOutput = classListener.output;
            let key = innerClassOutput.key;
            this.output.classes[key] = innerClassOutput;
        }
    }
}
class ClassExtractor extends BaseExtractor {
    constructor(path, ctx, includePosition = false, innerClass = false) {
        super(path, ctx, "class", includePosition, innerClass);
        let classBody = JavaParserHelper_1.JavaParserHelper.getChildByType(ctx, "classBody");
        this.extractFromClassBody(classBody);
    }
    extractFromClassBody(ctx) {
        let classBodyDeclarations = JavaParserHelper_1.JavaParserHelper.getChildrenByType(ctx, "classBodyDeclaration");
        for (let i = 0; i < classBodyDeclarations.length; i++) {
            let classBodyDeclaration = classBodyDeclarations[i];
            let memberDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(classBodyDeclaration, "memberDeclaration");
            if (memberDeclaration !== null) {
                this.extractFieldsFromMember(memberDeclaration);
                this.extractMethodsFromMember(memberDeclaration);
                super.extractClassOrInterfaceFromMember(memberDeclaration);
            }
        }
    }
    extractFieldsFromMember(memberDeclarationCtx) {
        let fieldDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(memberDeclarationCtx, "fieldDeclaration");
        if (fieldDeclaration !== null) {
            let fieldListener = new JavaParserFieldExtractor_1.JavaParserFieldExtractor(fieldDeclaration, this.includePosition);
            let field = fieldListener.field;
            let key = field.key;
            this.output.fields[key] = field;
        }
    }
    extractMethodsFromMember(memberDeclarationCtx) {
        let methodDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(memberDeclarationCtx, "methodDeclaration");
        if (methodDeclaration !== null) {
            // @ts-ignore
            let methodListener = new JavaParserMethodExtractor_1.JavaParserMethodExtractor(methodDeclaration, methodDeclaration.parentCtx.parentCtx, this.includePosition);
            let method = methodListener.output;
            let key = method.key;
            this.output.methods[key] = method;
        }
    }
}
class InterfaceExtractor extends BaseExtractor {
    constructor(path, ctx, includePosition = false, innerInterface = false) {
        super(path, ctx, "interface", includePosition, innerInterface);
        let interfaceBody = JavaParserHelper_1.JavaParserHelper.getChildByType(ctx, "interfaceBody");
        this.extractFromInterfaceBody(interfaceBody);
    }
    extractFromInterfaceBody(ctx) {
        let interfaceBodyDeclarations = JavaParserHelper_1.JavaParserHelper.getChildrenByType(ctx, "interfaceBodyDeclaration");
        for (let i = 0; i < interfaceBodyDeclarations.length; i++) {
            let interfaceBodyDeclaration = interfaceBodyDeclarations[i];
            let interfaceMemberDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(interfaceBodyDeclaration, "interfaceMemberDeclaration");
            if (interfaceMemberDeclaration !== null) {
                // there are no fields in interfaces
                //let fieldDeclaration = JavaParserHelper.getChildByType(interfaceMemberDeclaration, "fieldDeclaration");
                this.extractInterfaceMethodsFromMember(interfaceMemberDeclaration);
                super.extractClassOrInterfaceFromMember(interfaceMemberDeclaration);
            }
        }
    }
    extractInterfaceMethodsFromMember(interfaceMemberDeclarationCtx) {
        let interfaceMethodDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(interfaceMemberDeclarationCtx, "interfaceMethodDeclaration");
        if (interfaceMethodDeclaration !== null) {
            /**
             "children": [
             {
                                  "type": "interfaceMethodDeclaration",
                                  "node": "InterfaceMethodDeclarationContext",
                                  "children": [
                                    {
                                      "type": "interfaceCommonBodyDeclaration",
                                      "node": "InterfaceCommonBodyDeclarationContext",
                                      "children": [
                                        {
                                          "type": "typeTypeOrVoid",
                                          "node": "TypeTypeOrVoidContext",
                                          "children": [
             */
            let interfaceCommonBodyDeclaration = JavaParserHelper_1.JavaParserHelper.getChildByType(interfaceMethodDeclaration, "interfaceCommonBodyDeclaration");
            if (interfaceCommonBodyDeclaration !== null) {
                // @ts-ignore
                let methodListener = new JavaParserMethodExtractor_1.JavaParserMethodExtractor(interfaceCommonBodyDeclaration, interfaceCommonBodyDeclaration.parentCtx.parentCtx.parentCtx, this.includePosition);
                let method = methodListener.output;
                let key = method.key;
                this.output.methods[key] = method;
            }
        }
    }
}
class JavaParserAntlr4 {
    static parse(file, includePosition) {
        let code = file.content;
        let path = file.path;
        const chars = new MyAntlr4_1.antlr4.InputStream(code);
        const lexer = new JavaLexer_1.default(chars);
        const tokens = new MyAntlr4_1.antlr4.CommonTokenStream(lexer);
        const parser = new JavaParser_1.default(tokens);
        parser.buildParseTrees = true;
        const cst = parser.compilationUnit();
        JavaAntlr4CstPrinter_1.JavaAntlr4CstPrinter.print(cst, "Whole cst");
        let output = {};
        // @ts-ignore
        let typeDeclarations = JavaParserHelper_1.JavaParserHelper.getChildrenByType(cst, "typeDeclaration");
        for (let typeDeclaration of typeDeclarations) {
            // @ts-ignore
            for (let i = 0; i < typeDeclaration.children.length; i++) {
                // @ts-ignore
                let child = typeDeclaration.children[i];
                let type = JavaParserHelper_1.JavaParserHelper.getCtxType(child);
                if (type === "classDeclaration") {
                    let classDeclaration = child;
                    let classExtractor = new ClassExtractor(path, classDeclaration, includePosition);
                    let extractorOutput = classExtractor.output;
                    let key = extractorOutput.key;
                    output[key] = extractorOutput;
                }
                if (type === "interfaceDeclaration") {
                    let interfaceDeclaration = child;
                    let interfaceExtractor = new InterfaceExtractor(path, interfaceDeclaration, includePosition);
                    let extractorOutput = interfaceExtractor.output;
                    let key = extractorOutput.key;
                    output[key] = extractorOutput;
                }
            }
        }
        return output;
    }
}
exports.JavaParserAntlr4 = JavaParserAntlr4;
