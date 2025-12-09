export default class HashSet {
    constructor(hashFunction: any, equalsFunction: any);
    data: {};
    hashFunction: any;
    equalsFunction: any;
    add(value: any): any;
    has(value: any): boolean;
    get(value: any): any;
    values(): any[];
    toString(): string;
    get length(): any;
}
