export const __esModule: boolean;
export default PlusLoopbackState;
declare const PlusLoopbackState_base: any;
/**
 * Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
 * one to the loop back to start of the block and one to exit.
 */
declare class PlusLoopbackState extends PlusLoopbackState_base {
    [x: string]: any;
    stateType: any;
}
