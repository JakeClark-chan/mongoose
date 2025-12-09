import { SoftwareProject } from "./SoftwareProject";
export declare class DetectorOptions {
    sharedDataFieldsMinimum: number;
    sharedDataFieldsHierarchyConsidered: boolean;
    sharedMethodParametersMinimum: number;
    sharedMethodParametersHierarchyConsidered: boolean;
    constructor(options: any);
}
export declare class Detector {
    options: DetectorOptions;
    constructor(options: any);
    detect(project: SoftwareProject): void;
    private getCommonMethodParametersForSoftwareProject;
    private analyzeMethods;
    /**
     * DataclumpsInspection.java line 370
     * @param method
     * @param methodToClassOrInterfaceDict
     * @private
     */
    private analyzeMethod;
    /**
     * DataclumpsInspection.java line 487
     * @param method
     * @param methodToClassOrInterfaceDict
     * @private
     */
    private checkParameterDataClumps;
    /**
     * DataclumpsInspection.java line 547
     * @param method
     * @param methodParametersDict
     * @param currentClassOrInterface
     * @param classesOrInterfacesDict
     * @param isSameClassOrInterface
     * @private
     */
    private checkMethodParametersForDataClumps;
    private countCommonParametersBetweenMethods;
    private countCommonParameters;
    private getCommonParameterKeys;
    private isCommonParameter;
    /**
     * Helper Methods
     */
    private getMethodToClassOrInterfaceDict;
    private getMethodsDict;
    private printDictKeys;
    private getClassesOrInterfacesDict;
    private getClassesOrInterfacesFromFile;
}
