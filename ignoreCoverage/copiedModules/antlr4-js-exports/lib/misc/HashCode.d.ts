export const __esModule: boolean;
export default HashCode;
declare class HashCode {
    static hashStuff(...args: any[]): number;
    count: number;
    hash: number;
    update(...args: any[]): void;
    finish(): number;
}
