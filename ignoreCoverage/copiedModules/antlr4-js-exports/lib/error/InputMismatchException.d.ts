export const __esModule: boolean;
export default InputMismatchException;
declare const InputMismatchException_base: any;
/**
 * This signifies any kind of mismatched input exceptions such as
 * when the current input does not match the expected token.
 */
declare class InputMismatchException extends InputMismatchException_base {
    [x: string]: any;
    constructor(recognizer: any);
    offendingToken: any;
}
