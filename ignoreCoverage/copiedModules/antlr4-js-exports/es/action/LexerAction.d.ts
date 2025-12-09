export default class LexerAction {
    constructor(action: any);
    actionType: any;
    isPositionDependent: boolean;
    hashCode(): number;
    updateHashCode(hash: any): void;
    equals(other: any): boolean;
}
