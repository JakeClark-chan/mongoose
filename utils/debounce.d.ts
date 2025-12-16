declare type FunctionToDebounce = (...args: any[]) => void;
export declare const debounce: <T extends FunctionToDebounce>(func: T, wait: number, immediate?: boolean | undefined) => T;
export {};
