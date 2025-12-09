export const __esModule: boolean;
export default BitSet;
declare class BitSet {
    data: any[];
    add(value: any): void;
    or(set: any): void;
    remove(value: any): void;
    has(value: any): boolean;
    values(): string[];
    minValue(): number;
    hashCode(): any;
    equals(other: any): any;
    toString(): string;
    get length(): number;
}
