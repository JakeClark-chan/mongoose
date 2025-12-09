export interface Dictionary<T> {
    [Key: string]: T;
}
export declare class ParameterTypeContext {
    name: string;
    key: string;
    type: string;
    position: any;
    constructor(key: any, name: any, type: any);
}
export declare class MyFile {
    content: string;
    path: string;
    ast: Dictionary<ClassOrInterfaceTypeContext>;
    constructor(path: string, content: string);
}
export declare class ClassOrInterfaceTypeContext extends ParameterTypeContext {
    modifiers: string[] | undefined;
    fields: Dictionary<MemberFieldTypeContext>;
    methods: Dictionary<MethodTypeContext>;
    classes: Dictionary<ClassOrInterfaceTypeContext>;
    interfaces: Dictionary<ClassOrInterfaceTypeContext>;
    constructor(key: any, name: any, type: any);
}
export declare class MemberFieldTypeContext extends ParameterTypeContext {
    parameters: ParameterTypeContext[];
    modifiers: string[];
    constructor(key: any, name: any, type: any);
}
export declare class MethodParameterTypeContext extends ParameterTypeContext {
}
export declare class MethodTypeContext extends ParameterTypeContext {
    modifiers: string[];
    returnType: string | undefined;
    parameters: MethodParameterTypeContext[];
    constructor(key: any, name: any, type: any);
}
