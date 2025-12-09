export declare class JavaParserHelper {
    static getCtxType(ctx: any): any;
    static getChildrenByType(ctx: any, type: any): never[];
    static getChildByType(ctx: any, type: any): null;
    static custom_getPosition(ctx: any): {
        startLine: any;
        startColumn: any;
        stopLine: any;
        stopColumn: any;
    };
    static getModifiers(ctx: any): never[];
}
