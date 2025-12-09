export default class IntervalSet {
    intervals: any[] | null;
    readOnly: boolean;
    first(v: any): any;
    addOne(v: any): void;
    addRange(l: any, h: any): void;
    addInterval(toAdd: any): void;
    addSet(other: any): IntervalSet;
    reduce(pos: any): void;
    complement(start: any, stop: any): IntervalSet;
    contains(item: any): boolean;
    removeRange(toRemove: any): void;
    removeOne(value: any): void;
    toString(literalNames: any, symbolicNames: any, elemsAreChar: any): any;
    toCharString(): string;
    toIndexString(): any;
    toTokenString(literalNames: any, symbolicNames: any): any;
    elementName(literalNames: any, symbolicNames: any, token: any): any;
    get length(): any;
}
