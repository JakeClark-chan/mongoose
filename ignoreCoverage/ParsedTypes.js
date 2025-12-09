"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodTypeContext = exports.MethodParameterTypeContext = exports.MemberFieldTypeContext = exports.ClassOrInterfaceTypeContext = exports.MyFile = exports.ParameterTypeContext = void 0;
class ParameterTypeContext {
    constructor(key, name, type) {
        this.key = key;
        this.name = name;
        this.type = type;
    }
}
exports.ParameterTypeContext = ParameterTypeContext;
class MyFile {
    constructor(path, content) {
        this.content = content;
        this.path = path;
        this.ast = {};
    }
}
exports.MyFile = MyFile;
class ClassOrInterfaceTypeContext extends ParameterTypeContext {
    constructor(key, name, type) {
        super(key, name, type);
        this.name = name;
        this.modifiers = [];
        this.fields = {};
        this.methods = {};
        this.classes = {};
        this.interfaces = {};
    }
}
exports.ClassOrInterfaceTypeContext = ClassOrInterfaceTypeContext;
class MemberFieldTypeContext extends ParameterTypeContext {
    constructor(key, name, type) {
        super(key, name, type);
        this.parameters = [];
        this.modifiers = [];
    }
}
exports.MemberFieldTypeContext = MemberFieldTypeContext;
class MethodParameterTypeContext extends ParameterTypeContext {
}
exports.MethodParameterTypeContext = MethodParameterTypeContext;
class MethodTypeContext extends ParameterTypeContext {
    constructor(key, name, type) {
        super(key, name, type);
        this.modifiers = [];
        this.parameters = [];
    }
}
exports.MethodTypeContext = MethodTypeContext;
