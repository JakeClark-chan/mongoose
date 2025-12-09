export default class HashCode {
    static hashStuff(...args: any[]): number;
    count: number;
    hash: number;
    update(...args: any[]): void;
    finish(): number;
}
