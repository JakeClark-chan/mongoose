export default class BitSet {
    data: any[];
    add(value: any): void;
    or(set: any): void;
    remove(value: any): void;
    has(value: any): boolean;
    values(): string[];
    minValue(): number;
    hashCode(): number;
    equals(other: any): boolean;
    toString(): string;
    get length(): number;
}
