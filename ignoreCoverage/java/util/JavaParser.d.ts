import { antlr4 } from "../../util/MyAntlr4";
export default class JavaParser extends antlr4.Parser {
    static grammarFileName: string;
    static literalNames: (string | null)[];
    static symbolicNames: (string | null)[];
    static ruleNames: string[];
    constructor(input: any);
    sempred(localctx: any, ruleIndex: any, predIndex: any): boolean;
    expression_sempred(localctx: any, predIndex: any): boolean;
    guardedPattern_sempred(localctx: any, predIndex: any): boolean;
    compilationUnit(): CompilationUnitContext;
    packageDeclaration(): PackageDeclarationContext;
    importDeclaration(): ImportDeclarationContext;
    typeDeclaration(): TypeDeclarationContext;
    modifier(): ModifierContext;
    classOrInterfaceModifier(): ClassOrInterfaceModifierContext;
    variableModifier(): VariableModifierContext;
    classDeclaration(): ClassDeclarationContext;
    typeParameters(): TypeParametersContext;
    typeParameter(): TypeParameterContext;
    typeBound(): TypeBoundContext;
    enumDeclaration(): EnumDeclarationContext;
    enumConstants(): EnumConstantsContext;
    enumConstant(): EnumConstantContext;
    enumBodyDeclarations(): EnumBodyDeclarationsContext;
    interfaceDeclaration(): InterfaceDeclarationContext;
    classBody(): ClassBodyContext;
    interfaceBody(): InterfaceBodyContext;
    classBodyDeclaration(): ClassBodyDeclarationContext;
    memberDeclaration(): MemberDeclarationContext;
    methodDeclaration(): MethodDeclarationContext;
    methodBody(): MethodBodyContext;
    typeTypeOrVoid(): TypeTypeOrVoidContext;
    genericMethodDeclaration(): GenericMethodDeclarationContext;
    genericConstructorDeclaration(): GenericConstructorDeclarationContext;
    constructorDeclaration(): ConstructorDeclarationContext;
    compactConstructorDeclaration(): CompactConstructorDeclarationContext;
    fieldDeclaration(): FieldDeclarationContext;
    interfaceBodyDeclaration(): InterfaceBodyDeclarationContext;
    interfaceMemberDeclaration(): InterfaceMemberDeclarationContext;
    constDeclaration(): ConstDeclarationContext;
    constantDeclarator(): ConstantDeclaratorContext;
    interfaceMethodDeclaration(): InterfaceMethodDeclarationContext;
    interfaceMethodModifier(): InterfaceMethodModifierContext;
    genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext;
    interfaceCommonBodyDeclaration(): InterfaceCommonBodyDeclarationContext;
    variableDeclarators(): VariableDeclaratorsContext;
    variableDeclarator(): VariableDeclaratorContext;
    variableDeclaratorId(): VariableDeclaratorIdContext;
    variableInitializer(): VariableInitializerContext;
    arrayInitializer(): ArrayInitializerContext;
    classOrInterfaceType(): ClassOrInterfaceTypeContext;
    typeArgument(): TypeArgumentContext;
    qualifiedNameList(): QualifiedNameListContext;
    formalParameters(): FormalParametersContext;
    receiverParameter(): ReceiverParameterContext;
    formalParameterList(): FormalParameterListContext;
    formalParameter(): FormalParameterContext;
    lastFormalParameter(): LastFormalParameterContext;
    lambdaLVTIList(): LambdaLVTIListContext;
    lambdaLVTIParameter(): LambdaLVTIParameterContext;
    qualifiedName(): QualifiedNameContext;
    literal(): LiteralContext;
    integerLiteral(): IntegerLiteralContext;
    floatLiteral(): FloatLiteralContext;
    altAnnotationQualifiedName(): AltAnnotationQualifiedNameContext;
    annotation(): AnnotationContext;
    elementValuePairs(): ElementValuePairsContext;
    elementValuePair(): ElementValuePairContext;
    elementValue(): ElementValueContext;
    elementValueArrayInitializer(): ElementValueArrayInitializerContext;
    annotationTypeDeclaration(): AnnotationTypeDeclarationContext;
    annotationTypeBody(): AnnotationTypeBodyContext;
    annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext;
    annotationTypeElementRest(): AnnotationTypeElementRestContext;
    annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext;
    annotationMethodRest(): AnnotationMethodRestContext;
    annotationConstantRest(): AnnotationConstantRestContext;
    defaultValue(): DefaultValueContext;
    moduleDeclaration(): ModuleDeclarationContext;
    moduleBody(): ModuleBodyContext;
    moduleDirective(): ModuleDirectiveContext;
    requiresModifier(): RequiresModifierContext;
    recordDeclaration(): RecordDeclarationContext;
    recordHeader(): RecordHeaderContext;
    recordComponentList(): RecordComponentListContext;
    recordComponent(): RecordComponentContext;
    recordBody(): RecordBodyContext;
    block(): BlockContext;
    blockStatement(): BlockStatementContext;
    localVariableDeclaration(): LocalVariableDeclarationContext;
    identifier(): IdentifierContext;
    typeIdentifier(): TypeIdentifierContext;
    localTypeDeclaration(): LocalTypeDeclarationContext;
    statement(): StatementContext;
    catchClause(): CatchClauseContext;
    catchType(): CatchTypeContext;
    finallyBlock(): FinallyBlockContext;
    resourceSpecification(): ResourceSpecificationContext;
    resources(): ResourcesContext;
    resource(): ResourceContext;
    switchBlockStatementGroup(): SwitchBlockStatementGroupContext;
    switchLabel(): SwitchLabelContext;
    forControl(): ForControlContext;
    forInit(): ForInitContext;
    enhancedForControl(): EnhancedForControlContext;
    parExpression(): ParExpressionContext;
    expressionList(): ExpressionListContext;
    methodCall(): MethodCallContext;
    expression(_p: any): ExpressionContext;
    pattern(): PatternContext;
    lambdaExpression(): LambdaExpressionContext;
    lambdaParameters(): LambdaParametersContext;
    lambdaBody(): LambdaBodyContext;
    primary(): PrimaryContext;
    switchExpression(): SwitchExpressionContext;
    switchLabeledRule(): SwitchLabeledRuleContext;
    guardedPattern(_p: any): GuardedPatternContext;
    switchRuleOutcome(): SwitchRuleOutcomeContext;
    classType(): ClassTypeContext;
    creator(): CreatorContext;
    createdName(): CreatedNameContext;
    innerCreator(): InnerCreatorContext;
    arrayCreatorRest(): ArrayCreatorRestContext;
    classCreatorRest(): ClassCreatorRestContext;
    explicitGenericInvocation(): ExplicitGenericInvocationContext;
    typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext;
    nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext;
    nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext;
    typeList(): TypeListContext;
    typeType(): TypeTypeContext;
    primitiveType(): PrimitiveTypeContext;
    typeArguments(): TypeArgumentsContext;
    superSuffix(): SuperSuffixContext;
    explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext;
    arguments(): ArgumentsContext;
}
declare class CompilationUnitContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    packageDeclaration(): any;
    importDeclaration: (i: any) => any;
    typeDeclaration: (i: any) => any;
    moduleDeclaration(): any;
    EOF(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class PackageDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    PACKAGE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedName(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    annotation: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ImportDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    IMPORT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedName(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STATIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DOT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MUL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    classDeclaration(): any;
    enumDeclaration(): any;
    interfaceDeclaration(): any;
    annotationTypeDeclaration(): any;
    recordDeclaration(): any;
    classOrInterfaceModifier: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ModifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    classOrInterfaceModifier(): any;
    NATIVE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SYNCHRONIZED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TRANSIENT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    VOLATILE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassOrInterfaceModifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    annotation(): any;
    PUBLIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PROTECTED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PRIVATE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STATIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    ABSTRACT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    FINAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STRICTFP(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SEALED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    NON_SEALED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class VariableModifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    FINAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    annotation(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    CLASS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    classBody(): any;
    typeParameters(): any;
    EXTENDS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeType(): any;
    IMPLEMENTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeList: (i: any) => any;
    PERMITS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeParametersContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeParameter: (i: any) => any;
    GT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeParameterContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    annotation: (i: any) => any;
    EXTENDS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeBound(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeBoundContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType: (i: any) => any;
    BITAND: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class EnumDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    ENUM(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    IMPLEMENTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeList(): any;
    enumConstants(): any;
    COMMA(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enumBodyDeclarations(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class EnumConstantsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    enumConstant: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class EnumConstantContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    annotation: (i: any) => any;
    arguments(): any;
    classBody(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class EnumBodyDeclarationsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    classBodyDeclaration: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    INTERFACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    interfaceBody(): any;
    typeParameters(): any;
    EXTENDS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeList: (i: any) => any;
    PERMITS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    classBodyDeclaration: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    interfaceBodyDeclaration: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassBodyDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    block(): any;
    STATIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    memberDeclaration(): any;
    modifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class MemberDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    recordDeclaration(): any;
    methodDeclaration(): any;
    genericMethodDeclaration(): any;
    fieldDeclaration(): any;
    constructorDeclaration(): any;
    genericConstructorDeclaration(): any;
    interfaceDeclaration(): any;
    annotationTypeDeclaration(): any;
    classDeclaration(): any;
    enumDeclaration(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class MethodDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeTypeOrVoid(): any;
    identifier(): any;
    formalParameters(): any;
    methodBody(): any;
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    THROWS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedNameList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class MethodBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    block(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeTypeOrVoidContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    VOID(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class GenericMethodDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeParameters(): any;
    methodDeclaration(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class GenericConstructorDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeParameters(): any;
    constructorDeclaration(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ConstructorDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    formalParameters(): any;
    block(): any;
    THROWS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedNameList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class CompactConstructorDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    block(): any;
    modifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FieldDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    variableDeclarators(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceBodyDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    interfaceMemberDeclaration(): any;
    modifier: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceMemberDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    recordDeclaration(): any;
    constDeclaration(): any;
    interfaceMethodDeclaration(): any;
    genericInterfaceMethodDeclaration(): any;
    interfaceDeclaration(): any;
    annotationTypeDeclaration(): any;
    classDeclaration(): any;
    enumDeclaration(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ConstDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    constantDeclarator: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ConstantDeclaratorContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    variableInitializer(): any;
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceMethodDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    interfaceCommonBodyDeclaration(): any;
    interfaceMethodModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceMethodModifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    annotation(): any;
    PUBLIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    ABSTRACT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DEFAULT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STATIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STRICTFP(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class GenericInterfaceMethodDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeParameters(): any;
    interfaceCommonBodyDeclaration(): any;
    interfaceMethodModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InterfaceCommonBodyDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeTypeOrVoid(): any;
    identifier(): any;
    formalParameters(): any;
    methodBody(): any;
    annotation: (i: any) => any;
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    THROWS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedNameList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class VariableDeclaratorsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    variableDeclarator: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class VariableDeclaratorContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    variableDeclaratorId(): any;
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    variableInitializer(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class VariableDeclaratorIdContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class VariableInitializerContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    arrayInitializer(): any;
    expression(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ArrayInitializerContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    variableInitializer: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassOrInterfaceTypeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeIdentifier(): any;
    identifier: (i: any) => any;
    DOT: (i: any) => any;
    typeArguments: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeArgumentContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    QUESTION(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    annotation: (i: any) => any;
    EXTENDS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SUPER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class QualifiedNameListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    qualifiedName: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FormalParametersContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    receiverParameter(): any;
    COMMA(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    formalParameterList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ReceiverParameterContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    THIS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier: (i: any) => any;
    DOT: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FormalParameterListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    formalParameter: (i: any) => any;
    COMMA: (i: any) => any;
    lastFormalParameter(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FormalParameterContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    variableDeclaratorId(): any;
    variableModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LastFormalParameterContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    ELLIPSIS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    variableDeclaratorId(): any;
    variableModifier: (i: any) => any;
    annotation: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LambdaLVTIListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    lambdaLVTIParameter: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LambdaLVTIParameterContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    VAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    variableModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class QualifiedNameContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier: (i: any) => any;
    DOT: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LiteralContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    integerLiteral(): any;
    floatLiteral(): any;
    CHAR_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STRING_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BOOL_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    NULL_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TEXT_BLOCK(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class IntegerLiteralContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    DECIMAL_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    HEX_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OCT_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BINARY_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FloatLiteralContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    FLOAT_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    HEX_FLOAT_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AltAnnotationQualifiedNameContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    AT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier: (i: any) => any;
    DOT: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    AT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedName(): any;
    altAnnotationQualifiedName(): any;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    elementValuePairs(): any;
    elementValue(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ElementValuePairsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    elementValuePair: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ElementValuePairContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    elementValue(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ElementValueContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    expression(): any;
    annotation(): any;
    elementValueArrayInitializer(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ElementValueArrayInitializerContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    elementValue: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationTypeDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    AT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    INTERFACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    annotationTypeBody(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationTypeBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    annotationTypeElementDeclaration: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationTypeElementDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    annotationTypeElementRest(): any;
    modifier: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationTypeElementRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    annotationMethodOrConstantRest(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    classDeclaration(): any;
    interfaceDeclaration(): any;
    enumDeclaration(): any;
    annotationTypeDeclaration(): any;
    recordDeclaration(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationMethodOrConstantRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    annotationMethodRest(): any;
    annotationConstantRest(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationMethodRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    defaultValue(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class AnnotationConstantRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    variableDeclarators(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class DefaultValueContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    DEFAULT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    elementValue(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ModuleDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    MODULE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedName(): any;
    moduleBody(): any;
    OPEN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ModuleBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    moduleDirective: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ModuleDirectiveContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    REQUIRES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    qualifiedName: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    requiresModifier: (i: any) => any;
    EXPORTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TO(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OPENS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    USES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PROVIDES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    WITH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RequiresModifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    TRANSITIVE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    STATIC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RecordDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    RECORD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    recordHeader(): any;
    recordBody(): any;
    typeParameters(): any;
    IMPLEMENTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RecordHeaderContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    recordComponentList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RecordComponentListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    recordComponent: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RecordComponentContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    identifier(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class RecordBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    classBodyDeclaration: (i: any) => any;
    compactConstructorDeclaration: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class BlockContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    blockStatement: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class BlockStatementContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    localVariableDeclaration(): any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    localTypeDeclaration(): any;
    statement(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LocalVariableDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    VAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression(): any;
    typeType(): any;
    variableDeclarators(): any;
    variableModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class IdentifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    IDENTIFIER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MODULE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OPEN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    REQUIRES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    EXPORTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OPENS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TO(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    USES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PROVIDES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    WITH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TRANSITIVE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    YIELD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SEALED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PERMITS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RECORD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    VAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeIdentifierContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    IDENTIFIER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MODULE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OPEN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    REQUIRES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    EXPORTS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OPENS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TO(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    USES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PROVIDES(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    WITH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TRANSITIVE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SEALED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    PERMITS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RECORD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LocalTypeDeclarationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    classDeclaration(): any;
    interfaceDeclaration(): any;
    recordDeclaration(): any;
    classOrInterfaceModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class StatementContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    block(): any;
    ASSERT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression: (i: any) => any;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    IF(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    parExpression(): any;
    statement: (i: any) => any;
    ELSE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    FOR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    forControl(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    WHILE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DO(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TRY(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    finallyBlock(): any;
    catchClause: (i: any) => any;
    resourceSpecification(): any;
    SWITCH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    switchBlockStatementGroup: (i: any) => any;
    switchLabel: (i: any) => any;
    SYNCHRONIZED(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RETURN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    THROW(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BREAK(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    CONTINUE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    YIELD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    switchExpression(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class CatchClauseContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    CATCH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    catchType(): any;
    identifier(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    block(): any;
    variableModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class CatchTypeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    qualifiedName: (i: any) => any;
    BITOR: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class FinallyBlockContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    FINALLY(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    block(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ResourceSpecificationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    resources(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SEMI(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ResourcesContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    resource: (i: any) => any;
    SEMI: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ResourceContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression(): any;
    classOrInterfaceType(): any;
    variableDeclaratorId(): any;
    VAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    variableModifier: (i: any) => any;
    qualifiedName(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SwitchBlockStatementGroupContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    switchLabel: (i: any) => any;
    blockStatement: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SwitchLabelContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    CASE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeType(): any;
    expression(): any;
    IDENTIFIER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    DEFAULT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ForControlContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    enhancedForControl(): any;
    SEMI: (i: any) => any;
    forInit(): any;
    expression(): any;
    expressionList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ForInitContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    localVariableDeclaration(): any;
    expressionList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class EnhancedForControlContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    variableDeclaratorId(): any;
    COLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression(): any;
    typeType(): any;
    VAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    variableModifier: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ParExpressionContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ExpressionListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    expression: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class MethodCallContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expressionList(): any;
    THIS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SUPER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ExpressionContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    primary(): any;
    methodCall(): any;
    NEW(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    creator(): any;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeType: (i: any) => any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression: (i: any) => any;
    annotation: (i: any) => any;
    BITAND: (i: any) => any;
    ADD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SUB(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    INC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DEC(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    TILDE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BANG(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    lambdaExpression(): any;
    switchExpression(): any;
    COLONCOLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    typeArguments(): any;
    classType(): any;
    MUL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DIV(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MOD(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LT: (i: any) => any;
    GT: (i: any) => any;
    LE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    GE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    EQUAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    NOTEQUAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    CARET(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BITOR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    AND(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    QUESTION(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    ADD_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SUB_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MUL_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DIV_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    AND_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    OR_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    XOR_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RSHIFT_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    URSHIFT_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LSHIFT_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    MOD_ASSIGN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DOT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    THIS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    innerCreator(): any;
    SUPER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    superSuffix(): any;
    explicitGenericInvocation(): any;
    nonWildcardTypeArguments(): any;
    LBRACK(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACK(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    INSTANCEOF(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    pattern(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class PatternContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType(): any;
    identifier(): any;
    variableModifier: (i: any) => any;
    annotation: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LambdaExpressionContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    lambdaParameters(): any;
    ARROW(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    lambdaBody(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LambdaParametersContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier: (i: any) => any;
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    formalParameterList(): any;
    COMMA: (i: any) => any;
    lambdaLVTIList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class LambdaBodyContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    expression(): any;
    block(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class PrimaryContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expression(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    THIS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SUPER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    literal(): any;
    identifier(): any;
    typeTypeOrVoid(): any;
    DOT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    CLASS(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    nonWildcardTypeArguments(): any;
    explicitGenericInvocationSuffix(): any;
    arguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SwitchExpressionContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    SWITCH(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    parExpression(): any;
    LBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RBRACE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    switchLabeledRule: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SwitchLabeledRuleContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    CASE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    switchRuleOutcome(): any;
    ARROW(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COLON(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expressionList(): any;
    NULL_LITERAL(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    guardedPattern(): any;
    DEFAULT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class GuardedPatternContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    guardedPattern(): any;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeType(): any;
    identifier(): any;
    variableModifier: (i: any) => any;
    annotation: (i: any) => any;
    AND: (i: any) => any;
    expression: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SwitchRuleOutcomeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    block(): any;
    blockStatement: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassTypeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    classOrInterfaceType(): any;
    DOT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    annotation: (i: any) => any;
    typeArguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class CreatorContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    nonWildcardTypeArguments(): any;
    createdName(): any;
    classCreatorRest(): any;
    arrayCreatorRest(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class CreatedNameContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier: (i: any) => any;
    typeArgumentsOrDiamond: (i: any) => any;
    DOT: (i: any) => any;
    primitiveType(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class InnerCreatorContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    identifier(): any;
    classCreatorRest(): any;
    nonWildcardTypeArgumentsOrDiamond(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ArrayCreatorRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    arrayInitializer(): any;
    expression: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ClassCreatorRestContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    arguments(): any;
    classBody(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ExplicitGenericInvocationContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    nonWildcardTypeArguments(): any;
    explicitGenericInvocationSuffix(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeArgumentsOrDiamondContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    GT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeArguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class NonWildcardTypeArgumentsOrDiamondContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    GT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    nonWildcardTypeArguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class NonWildcardTypeArgumentsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeList(): any;
    GT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeListContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    typeType: (i: any) => any;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeTypeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    classOrInterfaceType(): any;
    primitiveType(): any;
    annotation: (i: any) => any;
    LBRACK: (i: any) => any;
    RBRACK: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class PrimitiveTypeContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    BOOLEAN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    CHAR(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    BYTE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    SHORT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    INT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    LONG(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    FLOAT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    DOUBLE(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class TypeArgumentsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    typeArgument: (i: any) => any;
    GT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    COMMA: (i: any) => any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class SuperSuffixContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    arguments(): any;
    DOT(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    identifier(): any;
    typeArguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ExplicitGenericInvocationSuffixContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    SUPER(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    superSuffix(): any;
    identifier(): any;
    arguments(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
declare class ArgumentsContext extends antlr4.ParserRuleContext {
    constructor(parser: any, parent: any, invokingState: any);
    LPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    RPAREN(): import("../../copiedModules/antlr4-js-exports/es/index.web").TerminalNode | null;
    expressionList(): any;
    enterRule(listener: any): void;
    exitRule(listener: any): void;
}
export {};
