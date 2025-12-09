import { MemberFieldTypeContext } from "./../../ParsedTypes";
export declare class JavaParserFieldExtractor {
    field: MemberFieldTypeContext;
    includePosition: boolean;
    constructor(ctx: any, includePosition: boolean);
    private custom_getFieldType;
    private enterFieldDeclaration;
}
