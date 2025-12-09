export const __esModule: boolean;
export default Interval;
declare class Interval {
    constructor(start: any, stop: any);
    start: any;
    stop: any;
    clone(): Interval;
    contains(item: any): boolean;
    toString(): any;
    get length(): number;
}
declare namespace Interval {
    const INVALID_INTERVAL: Interval;
}
